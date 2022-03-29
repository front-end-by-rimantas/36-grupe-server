import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';

import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageLogin } from '../pages/PageLogin.js';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const header = req.headers;

    req.on('data', () => {
        console.log('Klientas atsiunte duomenu...');
    })

    req.on('end', async () => {
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
            const pageObj = new pageClass();

            responseContent = pageObj.render();
            res.writeHead(200, {
                'Content-Type': MIMES.html,
            });
        }

        res.end(responseContent);
    })
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    // 'blog': PageBlog,
}

server.init = () => {
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}

export { server }