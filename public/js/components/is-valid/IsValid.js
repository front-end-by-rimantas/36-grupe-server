class IsValid {
    static username(text) {
        const minSize = 5;
        const maxSize = 15;
        if (typeof text !== 'string'
            || text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize
            || text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static email(text) {
        const minSize = 6;
        const maxSize = 87;
        if (typeof text !== 'string'
            || text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize
            || text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static password(text) {
        const minSize = 8;
        const maxSize = 100;
        if (typeof text !== 'string'
            || text === '') {
            return [true, 'Turi buti ne tuscias tekstas'];
        }
        if (text.length < minSize
            || text.length > maxSize) {
            return [true, `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`];
        }
        return [false, 'OK'];
    }

    static title() {
        return [false, 'OK'];
    }

    static slug() {
        return [false, 'OK'];
    }

    static content() {
        return [false, 'OK'];
    }
}

export { IsValid }