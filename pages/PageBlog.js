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

    emptyListHTML() {
        return `<div class="row empty-list">Looks like blog list is empty right now 🤔👀😭</div>`;
    }

    blogListHTML() {
        return `<div class="row list">
                    <div class="post">
                        <h2 class="post-title">Straipsnis</h2>
                        <div class="post-description">Straipsnio mini aprasas</div>
                        <a class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>
                    <div class="post">
                        <h2 class="post-title">Straipsnis</h2>
                        <div class="post-description">Straipsnio mini aprasas</div>
                        <a class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>
                    <div class="post">
                        <h2 class="post-title">Straipsnis</h2>
                        <div class="post-description">Straipsnio mini aprasas</div>
                        <a class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>
                    <div class="post">
                        <h2 class="post-title">Straipsnis</h2>
                        <div class="post-description">Straipsnio mini aprasas</div>
                        <a class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>
                    <div class="post">
                        <h2 class="post-title">Straipsnis</h2>
                        <div class="post-description">Straipsnio mini aprasas</div>
                        <a class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>
                </div>`;
    }

    mainHTML() {
        const blogFiles = [];
        return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    ${blogFiles.length === 0 ? this.emptyListHTML() : this.blogListHTML(blogFiles)}
                </section>`;
    }
}

export { PageBlog };