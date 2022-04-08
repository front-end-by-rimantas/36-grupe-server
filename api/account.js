import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";

const handler = {};

handler.account = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Account: veiksmas NEleistinas');
}

handler._method = {};

/**
 * Vartotojo paskyros sukurimas
 */
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
    const [accountsListError, accountsList] = await file.list('accounts');

    if (accountsListError) {
        return callback(500, {
            status: 'Error',
            msg: 'Ivyko klaida bandant registruoti vartotoja',
        })
    }

    // 3) patikrinti ar nera failo [email].json (jau sukurtas account'as)
    const userFile = user.email + '.json';

    if (accountsList.includes(userFile)) {
        return callback(200, {
            status: 'Error',
            msg: 'Vartotojas tokiu el pastu jau uzregistruotas',
        })
    }

    // 4) uzsifruoti vartotojo slaptazodi
    user.password = utils.hash(user.password);

    // 5) irasyti papildomos informacijos: registracijos laikas
    const now = Date.now();
    user.registerDate = now;
    user.lastPasswordUpdate = now;
    user.passwordChanges = 0;
    user.lastLoginDate = 0;
    user.loginHistory = [];

    // 6) sukuriame [email].json ir i ji irasome vartotojo objekta
    const [userCreateError] = await file.create('accounts', userFile, user);
    if (userCreateError) {
        return callback(200, {
            status: 'Error',
            msg: 'Klaida bandant irasyti vartotojo duomenis',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Vartotojo paskyra sukurta sekmingai',
    })
}

/**
 * Vartotojo informacijos gavimas
 */
handler._method.get = async (data, callback) => {
    const url = data.trimmedPath;
    const email = url.split('/')[2];

    const [emailError, emailMsg] = IsValid.email(email);
    if (emailError) {
        return callback(200, {
            status: 'Error',
            msg: emailMsg,
        })
    }

    let [err, content] = await file.read('accounts', email + '.json');
    if (err) {
        return callback(200, {
            status: 'Error',
            msg: 'Nepavyko rasti norimo vartotojo duomenu',
        })
    }

    content = utils.parseJSONtoObject(content);
    if (!content) {
        return callback(200, {
            status: 'Error',
            msg: 'Nepavyko apdoroti vartotojo duomenu',
        })
    }
    delete content.password;

    return callback(200, {
        status: 'Success',
        msg: JSON.stringify(content),
    })
}

/**
 * Vartotojo informacijos atnaujinimas
 */
handler._method.put = (data, callback) => {
    const url = data.trimmedPath;
    const email = url.split('/')[2];

    const [emailError, emailMsg] = IsValid.email(email);
    if (emailError) {
        return callback(200, {
            status: 'Error',
            msg: emailMsg,
        })
    }

    const { username, password } = data.payload;
    let updatedValues = 0;

    if (username && IsValid.username(username)) {
        // pakeisime username
        updatedValues++;
    }

    if (password && IsValid.password(password)) {
        // pakeisime password
        updatedValues++;
    }

    if (!updatedValues) {
        return callback(200, {
            status: 'Error',
            msg: 'Objekte nerasta informacijos, kuria butu leidziama atnaujinti, todel niekas nebuvo atnaujinta',
        })
    }

    return callback(200, {
        action: 'PUT',
        msg: 'Vartotojo informacija sekmingai atnaujinta',
    })
}

/**
 * Vartotojo paskyros istrinimas
 */
handler._method.delete = (data, callback) => {
    return callback(200, {
        action: 'DELETE',
        msg: 'Vartotojas sekmingai istrinta is sistemos',
    })
}

export default handler;