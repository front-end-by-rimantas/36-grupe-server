import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";

const handler = {};

handler.account = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Account: veiksmas NEleistinas');
}

handler._method = {};

handler._method.post = async (data, callback) => {
    // 1) reikia patikrinti ar data.payload (keys and values) yra teisingi
    const user = data.payload;
    if (typeof user !== 'object' || Object.keys(user).length !== 3) {
        return callback(200, {
            status: 'Error',
            msg: 'Vartotojo objekta sudaro tik 3 elementai (username, email, password)',
        })
    }

    const [usernameError, usernameMsg] = IsValid.username(user.username);
    if (usernameError) {
        return callback(200, {
            status: 'Error',
            msg: usernameMsg,
        })
    }
    const [emailError, emailMsg] = IsValid.email(user.email);
    if (emailError) {
        return callback(200, {
            status: 'Error',
            msg: emailMsg,
        })
    }
    const [passwordError, passwordMsg] = IsValid.password(user.password);
    if (passwordError) {
        return callback(200, {
            status: 'Error',
            msg: passwordMsg,
        })
    }

    // 2) nuskaitome kokie failai yra .data/accounts folderyje
    const accountsList = await file.list('accounts');
    console.log(accountsList);

    // 3) patikrinti ar nera failo [email].json (jau sukurtas account'as)
    // 4) uzsifruoti vartotojo slaptazodi
    // 5) sukuriame [email].json ir i ji irasome vartotojo objekta

    console.log(data.payload);
    return callback(200, {
        action: 'POST',
        msg: 'Vartotojo paskyra sukurta sekmingai',
    })
}

handler._method.get = (data, callback) => {
    return callback(200, {
        action: 'GET',
        msg: 'Stai tau visa info apie dominanti vartotoja',
    })
}

handler._method.put = (data, callback) => {
    return callback(200, {
        action: 'PUT',
        msg: 'Vartotojo informacija sekmingai atnaujinta',
    })
}

handler._method.delete = (data, callback) => {
    return callback(200, {
        action: 'DELETE',
        msg: 'Vartotojas sekmingai istrinta is sistemos',
    })
}

export default handler;