import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const header = req.headers;

    console.log('Bandom atidaryti:', trimmedPath);

    req.on('data', () => {
        console.log('Klientas atsiunte duomenu...');
    })

    req.on('end', () => {
        console.log('Uzklausa pilnai gauta - ziurim ko nori klientas...');

        // const contentHTML = server.routes[trimmedPath]
        //     ? server.routes[trimmedPath]
        //     : server.routes['404'];

        // pesimistinis atsakymas
        let contentHTML = server.routes['404'];

        // statinio URL atsakymas
        if (server.routes[trimmedPath]) {
            contentHTML = server.routes[trimmedPath];
        }

        // dinaminio blog URL atsakymas (jei yra)
        // pvz.: trimmpedPath = 'blog'
        // pvz.: trimmpedPath = 'blog/labas-rytas'
        // pvz.: trimmpedPath = 'blog/123'
        // pvz.: trimmpedPath = 'services'
        // pvz.: trimmpedPath = 'services/labas-rytas'
        // pvz.: trimmpedPath = 'services/123'
        const urlParts = trimmedPath.split('/');
        if (urlParts.length > 1) {
            if (urlParts[0] === 'blog') {
                contentHTML = `BLOG INNER: ${urlParts[1]}`;
            }
            if (urlParts[0] === 'services') {
                contentHTML = `SERVICES INNER: ${urlParts[1]}`;
            }
        }

        const HTML = `<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>

                <body>
                    <header>
                        <img src="#" alt="Logo">
                        <nav>
                            <a href="register">Register</a>
                            <a href="login">Login</a>
                        </nav>
                    </header>
                    <main>
                        ${contentHTML}
                    </main>
                    <footer>
                        Copyright &copy; 2022
                    </footer>
                </body>

                </html>`;

        res.end(HTML);
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
    console.log('Bandau paleisti serverio procesa...');
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}

export { server }