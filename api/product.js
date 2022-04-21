import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";

const handler = {};

handler.product = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Token: veiksmas NEleistinas');
}

handler._method = {};

handler._method.post = async (data, callback) => {
    const product = data.payload;
    const { name, price, inStock } = product;

    if (typeof product !== 'object'
        || Array.isArray(product)
        || Object.keys(product).length !== 3) {
        return callback(400, {
            status: 'Success',
            msg: 'Netinkamas produkto objektas',
        })
    }

    if (typeof name !== 'string'
        || name === '') {
        return callback(400, {
            status: 'Success',
            msg: 'Netinkamas produkto pavadinimas',
        })
    }

    if (typeof price !== 'number'
        || price < 0) {
        return callback(400, {
            status: 'Success',
            msg: 'Netinkama produkto kaina',
        })
    }

    if (typeof inStock !== 'number'
        || inStock < 0) {
        return callback(400, {
            status: 'Success',
            msg: 'Netinkamas produkto kiekis',
        })
    }

    const fileName = name.toLowerCase().split(' ').join('-') + '.json';
    const [createErr] = await file.create('products', fileName, product);
    if (createErr) {
        return callback(400, {
            status: 'Success',
            msg: 'Nepavyko sukurti produkto',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Produktas irasytas',
    })
}

handler._method.get = async (data, callback) => {
    const url = data.trimmedPath;
    const productName = url.split('/')[2];

    const [err, content] = await file.read('products', productName + '.json');
    if (err) {
        return callback(400, {
            status: 'Error',
            msg: 'Nepavyko rasti norimo produkto',
        })
    }

    const obj = utils.parseJSONtoObject(content);
    if (!obj) {
        return callback(400, {
            status: 'Error',
            msg: 'Nepavyko perskaityti norimo produkto informacijos',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: obj,
    })
}

handler._method.put = async (data, callback) => {
    const url = data.trimmedPath;
    const productName = url.split('/')[2];

    const [err, content] = await file.read('products', productName + '.json');
    if (err) {
        return callback(400, {
            status: 'Error',
            msg: 'Nepavyko rasti norimo produkto',
        })
    }

    const obj = utils.parseJSONtoObject(content);
    if (!obj) {
        return callback(400, {
            status: 'Error',
            msg: 'Nepavyko perskaityti norimo produkto informacijos',
        })
    }

    return callback(200, {
        status: 'Success',
        msg: 'Produktas sekmingai atnaujintas',
    })
}

handler._method.delete = async (data, callback) => {
    return callback(200, {
        action: 'DELETE',
        msg: 'Produktas sekmingai istrintas is sistemos',
    })
}

export default handler;