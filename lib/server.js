import http from 'http';
import { utils } from './utils.js';

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
        // tekstiniai failai:
        //   - css
        //   - js
        //   - svg
        // binary failai:
        //   - png/jpg/ico
        //   - woff, ttf
        //   - mp3, exe
        // API (www.psl.com/api/....)
        // puslapio HTML

        const fileExtension = utils.fileExtension(trimmedPath);
        const textFileExtensions = ['css', 'js', 'svg'];
        const binaryFileExtensions = ['png', 'jpg', 'ico', 'eot', 'ttf', 'woff', 'woff2', 'otf'];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinaryFile && !isAPI;

        let responseContent = '';

        if (isTextFile) {
            responseContent = 'TEXT FILE CONTENT';
        }

        if (isBinaryFile) {
            responseContent = 'BINARY FILE CONTENT';
        }

        if (isAPI) {
            responseContent = 'API CONTENT';
        }

        if (isPage) {
            // http://localhost:3000/
            // http://localhost:3000/register
            // http://localhost:3000/login
            // http://localhost:3000/404
            responseContent = 'PAGE HTML CONTENT';
        }

        res.end(responseContent);
    })
});

server.routes = {
    '': 'home HTML',
    '404': '404 HTML',
    'register': 'register HTML',
    'login': 'login HTML',
    'blog': 'blog list HTML',
    'services': 'services list HTML',
}

server.init = () => {
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}

export { server }