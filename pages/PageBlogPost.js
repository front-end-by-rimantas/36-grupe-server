import { file } from "../lib/file.js";
import { PageTemplate } from "../lib/PageTemplate.js";
import { utils } from "../lib/utils.js";

class PageBlogPost extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'blog-post';
    }

    async getPostData() {
        const routeParts = this.data.trimmedPath.split('/');
        if (routeParts.length !== 2) {
            return {};
        }

        const [readErr, readContent] = await file.read('blog', routeParts[1] + '.json');
        if (readErr) {
            return {};
        }

        const postObj = utils.parseJSONtoObject(readContent);
        if (!postObj) {
            return {};
        }

        const [authReadErr, authReadContent] = await file.read('accounts', postObj.author + '.json');
        if (authReadErr) {
            postObj.authorName = 'AnonyMouse';
        }

        const authorObj = utils.parseJSONtoObject(authReadContent);
        postObj.authorName = authorObj ? authorObj.username : 'AnonyMouse';

        return postObj;
    }

    isValidPost(post) {
        if (typeof post !== 'object'
            || post === null
            || Array.isArray(post)
            || typeof post.title !== 'string'
            || post.title === ''
            || typeof post.content !== 'string'
            || post.content === ''
            || typeof post.authorName !== 'string'
            || post.authorName === '') {
            return false;
        }

        return true;
    }

    badPostHTML() {
        return `<section class="container blog-inner">
                    <h1 class="row title">500</h1>
                    <p class="row">Something's wrong with server. Please, come back later.</p>
                </section>`;
    }

    correctPostHTML(post) {
        return `<section class="container blog-inner">
                    <h1 class="row title">${post.title}</h1>
                    <p class="row">${post.content}</p>
                    <footer class="row">${post.authorName}</footer>
                </section>`;
    }

    async mainHTML() {
        const postData = await this.getPostData();
        if (this.isValidPost(postData)) {
            return this.correctPostHTML(postData);
        } else {
            return this.badPostHTML();
        }
    }
}

export { PageBlogPost };