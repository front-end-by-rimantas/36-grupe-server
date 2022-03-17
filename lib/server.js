import http from 'http';

const server = {};

server.httpServer = http.createServer(() => {
    console.log('Skambutis i sukurta serveri...');
});

server.init = () => {
    console.log('Bandau paleisti serverio procesa...');
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}

export { server }