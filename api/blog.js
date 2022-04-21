import { file } from "../lib/file.js";
import { IsValid } from "../lib/IsValid.js";
import { utils } from "../lib/utils.js";

const handler = {};

handler.blog = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return await handler._method[data.httpMethod](data, callback);
    }

    return callback(400, 'Blog: veiksmas NEleistinas');
}

handler._method = {};

/**
 * Blog post sukurimas
 */
handler._method.post = async (data, callback) => {
    return callback(200, {
        status: 'Success',
        msg: 'Blog post sukurtas sekmingai',
        action: {
            type: 'redirect',
            href: '/blog',
        },
    })
}

/**
 * Blog post informacijos gavimas
 */
handler._method.get = async (data, callback) => {
    const url = data.trimmedPath;
    const blogSlug = url.split('/')[2];

    return callback(200, {
        status: 'Success',
        msg: content,
    })
}

/**
 * Blog post informacijos atnaujinimas
 */
handler._method.put = async (data, callback) => {
    const url = data.trimmedPath;
    const blogSlug = url.split('/')[2];

    return callback(200, {
        status: 'Success',
        msg: 'Blog post informacija sekmingai atnaujinta',
    })
}

/**
 * Blog post istrinimas
 */
handler._method.delete = async (data, callback) => {
    const url = data.trimmedPath;
    const blogSlug = url.split('/')[2];

    return callback(200, {
        status: 'Success',
        msg: 'Blog post sekmingai istrinta is sistemos',
    })
}

export default handler;