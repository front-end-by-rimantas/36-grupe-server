import { PageTemplate } from "../lib/PageTemplate.js";
import { file } from '../lib/file.js';

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

    async getBlogPostData() {
        const postSlug = this.data.trimmedPath.split('/')[1].trim();
        try {
            const fileContent = await file.read('/data/blog-posts', postSlug + '.json');
            const contentObj = utils.parseJSONtoObject(fileContent);
            return contentObj;
        } catch (error) {
            return false;
        }
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
                    <footer class="row">Author</footer>
                </section>`;
    }

    isValidPost(post) {
        if (typeof post !== 'object'
            || Array.isArray(post)
            || post === null) {
            return false;
        }
        return true;
    }

    async mainHTML() {
        const postData = await this.getBlogPostData();
        if (this.isValidPost(postData)) {
            return this.correctPostHTML(postData);
        } else {
            return this.badPostHTML();
        }
    }
}

export { PageBlogPost };