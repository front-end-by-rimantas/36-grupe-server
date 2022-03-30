import { PageTemplate } from "../lib/PageTemplate.js";

class PageBlog extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'blog';
    }

    mainHTML() {
        return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    BLOG
                </section>`;
    }
}

export { PageBlog };