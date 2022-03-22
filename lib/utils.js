const utils = {};

utils.fileExtension = (url) => {
    // about-us                     return ''
    // js/main.js                   return 'js'
    // css/main.css?version=2.0.5   return 'css'
    // css/fontawesome.min.css      return 'css'

    const parts = url.split('?')[0].split('.');
    if (parts.length < 2) {
        return '';
    }

    return parts[parts.length - 1];
}

export { utils }