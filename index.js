import { server } from './lib/server.js';

const app = {};

app.init = () => {
    // pasiruosti pradinius folder'ius

    // pasiruosti pradinius failus

    // prisijungimas prie DB (duomenu baze)

    // uzkurti pati serveri (musu programa)
    server.init();

    // reguliariu procesu paleidimas:
    // - istrinti senus/nebereikalingus failus
    // - maziau naudojamu failu archivavimas
    // - atsinaujinti informacija per/is API
}

app.init();

export { app };