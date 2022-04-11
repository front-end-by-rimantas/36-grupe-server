import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";
import config from '../config.js';

const handler = {};

handler.token = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Token: veiksmas NEleistinas');
}

handler._method = {};

handler._method.post = async (data, callback) => {
    const user = data.payload;
    const { email, password } = user;
    const requiredKeys = 2;

    const [emailErr, emailMsg] = IsValid.email(email);
    if (emailErr) {
        return callback(400, {
            status: 'Error',
            msg: emailMsg,
        })
    }

    const [passwordErr, passwordMsg] = IsValid.password(password);
    if (passwordErr) {
        return callback(400, {
            status: 'Error',
            msg: passwordMsg,
        })
    }

    if (requiredKeys !== Object.keys(user).length) {
        return callback(400, {
            status: 'Error',
            msg: 'Netinkama objekto struktura (turi buti tik: email, password)',
        })
    }

    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) {
        return callback(400, {
            status: 'Error',
            msg: 'Klaida bandant prisijungti: nesutampa email arba slaptazodis',
        })
    }

    const userObj = utils.parseJSONtoObject(readMsg);
    if (!userObj) {
        return callback(500, {
            status: 'Error',
            msg: 'Klaida bandant nuskaityti vartotojo duomenis',
        })
    }

    const hashedPassword = utils.hash(password);
    if (hashedPassword !== userObj.password) {
        return callback(400, {
            status: 'Error',
            msg: 'Klaida bandant prisijungti: nesutampa email arba slaptazodis',
        })
    }

    const tokenID = utils.randomString(config.sessionTokenLength);
    const token = {
        expire: Date.now() + config.cookiesMaxAge * 1000,
        email: email,
        browser: 'chrome',
    };

    const [createErr] = await file.create('token', tokenID + '.json', token);
    if (createErr) {
        return callback(500, {
            status: 'Error',
            msg: 'Klaida bandant isduoti sesijos Token',
        })
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

    return callback(200, {
        status: 'Success',
        msg: {
            id: tokenID,
            ...token
        },
    }, {
        'Set-Cookie': cookies.join('; '),
    })
}

handler._method.get = (data, callback) => {
    return callback(200, {
        action: 'GET',
        msg: 'Visa info apie sesijos TOKEN',
    })
}

handler._method.put = (data, callback) => {
    return callback(200, {
        action: 'PUT',
        msg: 'TOKEN sekmingai atnaujintas',
    })
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        action: 'DELETE',
        msg: 'TOKEN sekmingai istrintas is sistemos',
    })
}

export default handler;