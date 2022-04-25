import { PageTemplate } from "../lib/PageTemplate.js";

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

    mainHTML() {
        if (false) {
            return this.correctPostHTML();
        } else {
            return this.badPostHTML();
        }
        // if (this.isValidPost(postData)) {
        //     return this.correctPostHTML(postData);
        // } else {
        //     return this.badPostHTML();
        // }
    }
}

export { PageBlogPost };