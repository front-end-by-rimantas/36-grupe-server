import http from 'http';
import { utils } from './utils.js';

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

    req.on('end', () => {
        const fileExtension = utils.fileExtension(trimmedPath);
        const textFileExtensions = ['css', 'js', 'svg'];
        const binaryFileExtensions = ['png', 'jpg', 'ico', 'eot', 'ttf', 'woff', 'woff2', 'otf'];

        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinaryFile && !isAPI;

        let responseContent = '';

        if (isTextFile) {
            // trimmpedPath = css/pages/home.css
            // tikras failas: public/css/pages/home.css

            // trimmpedPath = js/pages/home.js
            // tikras failas: public/js/pages/home.js
            responseContent = 'TEXT FILE CONTENT';
        }

        if (isBinaryFile) {
            responseContent = 'BINARY FILE CONTENT';
        }

        if (isAPI) {
            responseContent = 'API CONTENT';
        }

        if (isPage) {
            const pageClass = server.routes[trimmedPath]
                ? server.routes[trimmedPath]
                : server.routes['404'];
            const pageObj = new pageClass();

            responseContent = pageObj.render();
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