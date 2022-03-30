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
// import { PageBlogPost } from '../pages/BlogPost.js';

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
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const fileExtension = utils.fileExtension(trimmedPath);
        const textFileExtensions = ['css', 'js', 'svg'];
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
        }

        let responseContent = '';

        const dataForHandlers = {
            baseURL,
            trimmedPath,
            httpMethod,
            headers,
            payload: utils.parseJSONtoObject(buffer),
            user: {
                isLoggedIn: false,
                email: '',
                browser: '',
            },
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
            responseContent = 'API CONTENT';
            res.writeHead(200);
        }

        if (isPage) {
            const pageClass = server.routes[trimmedPath]
                ? server.routes[trimmedPath]
                : server.routes['404'];
            const pageObj = new pageClass(dataForHandlers);

            const [pageHTML, responseHeaders] = await pageObj.render();
            responseContent = pageHTML;

            res.writeHead(200, {
                'Content-Type': MIMES.html,
                ...responseHeaders
            });
        }

        res.end(responseContent);
    })
});

/**
 * Statiniai viesai prieinami puslapiai/nuorodos
 */
server.routes = {
    '': PageHome,
    'blog': PageBlog,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    'logout': PageLogout,
    'create-blog-post': PageCreateBlogPost,
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