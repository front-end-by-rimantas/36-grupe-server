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
    const post = data.payload;
    if (typeof post !== 'object' || Object.keys(post).length !== 3) {
        return callback(200, {
            status: 'Error',
            msg: 'Blog post objekta sudaro tik 3 elementai (title, slug, content)',
        })
    }

    const [titleError, titleMsg] = IsValid.title(post.title);
    if (titleError) {
        return callback(200, {
            status: 'Error',
            msg: titleMsg,
        })
    }
    const [slugError, slugMsg] = IsValid.slug(post.slug);
    if (slugError) {
        return callback(200, {
            status: 'Error',
            msg: slugMsg,
        })
    }
    const [contentError, contentMsg] = IsValid.content(post.content);
    if (contentError) {
        return callback(200, {
            status: 'Error',
            msg: contentMsg,
        })
    }

    const [blogListError, blogList] = await file.list('blog');
    if (blogListError) {
        return callback(500, {
            status: 'Error',
            msg: 'Ivyko klaida bandant kurti blog posta',
        })
    }

    const postFile = post.slug + '.json';
    if (blogList.includes(postFile)) {
        return callback(200, {
            status: 'Error',
            msg: 'Blog postas su tokia nuoroda (slug) jau sukurtas',
        })
    }

    const now = Date.now();
    post.registerDate = now;
    post.lastUpdated = now;
    post.author = data.user.email;

    const [postCreateError] = await file.create('blog', postFile, post);
    if (postCreateError) {
        return callback(200, {
            status: 'Error',
            msg: 'Klaida bandant irasyti blog posta',
        })
    }

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