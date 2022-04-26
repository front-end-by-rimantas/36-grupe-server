import http from 'http';
import { StringDecoder } from 'string_decoder';
import config from '../config.js';
import { utils } from './utils.js';
import { file } from './file.js';

import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageBlog } from '../pages/PageBlog.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';
import { PageLogout } from '../pages/PageLogout.js';
import { PageCreateBlogPost } from '../pages/PageCreateBlogPost.js';
import { PageBlogPost } from '../pages/PageBlogPost.js';

import accountAPI from '../api/account.js';
import tokenAPI from '../api/token.js';
import productAPI from '../api/product.js';
import blogAPI from '../api/blog.js';

/**
 * Serverio klase.
 * 
 * Norint paleisti/inicijuoti serveri, reikia iskviesti `server.init()` metoda.
 */
const server = {};

/**
 * Pagrindine serverio funkcija, kuri apdoroja ieinancias uzklausas.
 */
server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const { searchParams, pathname } = parsedURL;
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const fileExtension = utils.fileExtension(trimmedPath);
        const textFileExtensions = ['css', 'js', 'svg', 'webmanifest'];
        const binaryFileExtensions = ['png', 'jpg', 'ico', 'eot', 'ttf', 'woff', 'woff2', 'otf'];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinaryFile && !isAPI;

        const MIMES = {
            html: 'text/html',
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon',
            webmanifest: 'application/manifest+json',
            json: 'application/json',
        }

        let responseContent = '';

        const dataForHandlers = {
            baseURL,
            trimmedPath,
            searchParams,
            httpMethod,
            headers,
            payload: utils.parseJSONtoObject(buffer),
            user: {
                isLoggedIn: false,
                email: '',
            },
            cookies: utils.parseCookies(headers.cookie),
        }

        const tokenID = dataForHandlers.cookies['login-token'];
        if (await tokenAPI._method.verify(tokenID)) {
            const userObj = await tokenAPI._method.getUserDetails(tokenID);
            dataForHandlers.user = {
                ...userObj,
                isLoggedIn: true,
            };
        }

        if (isTextFile) {
            const [err, content] = await file.readPublic(trimmedPath);
            if (err) {
                responseContent = 'Encoutered an error while trying to read a requested file.';
                res.writeHead(404);
            } else {
                responseContent = content;
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                });
            }
        }

        if (isBinaryFile) {
            const [err, content] = await file.readBinaryPublic(trimmedPath);
            if (err) {
                responseContent = 'Encoutered an error while trying to read a requested file.';
                res.writeHead(404);
            } else {
                responseContent = content;
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                });
            }
        }

        if (isAPI) {
            let cookiesUpdateHeader = {};
            if (dataForHandlers.user.isLoggedIn) {
                cookiesUpdateHeader = await server.extendCookies(tokenID);
            }

            const APIroute = trimmedPath.split('/')[1];
            const APIRouteList = dataForHandlers.user.isLoggedIn ? server.protectedAPI : server.publicAPI;
            if (APIRouteList[APIroute] && APIRouteList[APIroute][APIroute]) {
                const APIhandler = APIRouteList[APIroute][APIroute];

                function APIcallback(statusCode, payload = '', headers = {}) {
                    responseContent = JSON.stringify(payload);
                    res.writeHead(statusCode, {
                        'Content-Type': MIMES.json,
                        ...headers,
                        ...cookiesUpdateHeader,
                    });
                }

                await APIhandler(dataForHandlers, APIcallback);
            } else {
                responseContent = JSON.stringify({
                    status: 'error',
                    msg: 'ERROR: no such API endpoint found',
                });

                res.writeHead(404, {
                    'Content-Type': MIMES.json,
                })
            }
        }

        if (isPage) {
            let cookiesUpdateHeader = {};
            if (dataForHandlers.user.isLoggedIn) {
                cookiesUpdateHeader = await server.extendCookies(tokenID);
            }

            const routeList = dataForHandlers.user.isLoggedIn ? server.protectedRoutes : server.publicRoutes;
            const [level1, level2] = trimmedPath.split('/');
            let pageClass = routeList[''];

            if (!level2) {
                pageClass = routeList[level1] ? routeList[level1] : routeList['404'];
            }

            if (level2) {
                pageClass = server.secondLevelRoutes[level1] ? server.secondLevelRoutes[level1] : routeList['404'];
            }

            const pageObj = new pageClass(dataForHandlers);
            const pageResp = await pageObj.render();
            responseContent = pageResp[0];
            const responseHeaders = pageResp[1];

            res.writeHead(200, {
                'Content-Type': MIMES.html,
                ...responseHeaders,
                ...cookiesUpdateHeader,
            });
        }

        res.end(responseContent);
    })
});

server.extendCookies = async (tokenID) => {
    const [readErr, readContent] = await file.read('token', tokenID + '.json');
    if (readErr) {
        return {};
    }

    let obj = utils.parseJSONtoObject(readContent);
    if (!obj) {
        return {};
    }

    obj = {
        ...obj,
        expire: Date.now() + config.cookiesMaxAge * 1000,
    }

    const [updateErr, updateMsg] = await file.update('token', tokenID + '.json', obj);
    if (updateErr) {
        return {};
    }

    const cookies = [
        'login-token=' + tokenID,
        'path=/',
        'domain=localhost',
        'max-age=' + config.cookiesMaxAge,
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly'
    ];

    return {
        'Set-Cookie': [
            cookies.join('; '),
        ],
    }
}

/**
 * Statiniai viesai prieinami puslapiai/nuorodos
 */
server.publicRoutes = {
    '': PageHome,
    'blog': PageBlog,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    'logout': PageLogout,
}

/**
 * Statiniai privatus puslapiai/nuorodos
 */
server.protectedRoutes = {
    '': PageHome,
    'blog': PageBlog,
    '404': Page404,
    'logout': PageLogout,
    'create-blog-post': PageCreateBlogPost,
}

server.secondLevelRoutes = {
    'blog': PageBlogPost,
    // 'services': PageSingleService,
    // 'team': PageTeamMember,
}

/**
 * Public API endpoints.
 */
server.publicAPI = {
    'account': accountAPI,
    'token': tokenAPI,
}

/**
 * Protected API endpoints.
 */
server.protectedAPI = {
    'product': productAPI,
    'blog': blogAPI,
}

/**
 * Serverio veikimo metu sukurtu failu, kurie yra nebereikalingi, istrinimas.
 */
server.cleanUp = async () => {
    const [err, list] = await file.list('token');
    if (err
        || !Array.isArray(list)
        || list.length === 0) {
        return;
    }

    const now = Date.now();
    for (const fileName of list) {
        const [readErr, readContent] = await file.read('token', fileName);
        if (readErr) {
            continue;
        }

        const obj = utils.parseJSONtoObject(readContent);
        if (!obj) {
            continue;
        }

        if (obj.expire < now) {
            await file.delete('token', fileName);
        }
    }
}

/**
 * Serveri paleidziantis metodas.
 */
server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server }