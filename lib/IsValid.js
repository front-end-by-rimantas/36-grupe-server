class IsValid {
    /**
     * Metodas `username` validavimui.
     * @param {string} text Vartotojo username
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static username(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "username" reiksme'];
        }
        return [false, 'Username is valid'];
    }

    /**
     * Metodas `email` validavimui.
     * @param {string} text Vartotojo email
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static email(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "email" reiksme'];
        }
        return [false, 'Email is valid'];
    }

    /**
     * Metodas `password` validavimui.
     * @param {string} text Vartotojo password
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static password(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "password" reiksme'];
        }
        return [false, 'Password is valid'];
    }

    /**
     * Metodas `title` validavimui.
     * @param {string} text Post title
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static title(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "title" reiksme'];
        }
        if (text === '') {
            return [true, '"Title" negali buti tuscias tekstas'];
        }
        return [false, 'title is valid'];
    }

    /**
     * Metodas `slug` validavimui.
     * @param {string} text Post slug
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static slug(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "slug" reiksme'];
        }
        if (text === '') {
            return [true, '"Slug" negali buti tuscias tekstas'];
        }
        return [false, 'slug is valid'];
    }

    /**
     * Metodas `content` validavimui.
     * @param {string} text Post content
     * @returns {[boolean, string]} Mastyvas su validacijos klaidos statusu ir validacijos zinute
     */
    static content(text) {
        if (typeof text !== 'string') {
            return [true, 'Netinkamo tipo "content" reiksme'];
        }
        if (text === '') {
            return [true, '"Content" negali buti tuscias tekstas'];
        }
        return [false, 'content is valid'];
    }
}

export { IsValid }