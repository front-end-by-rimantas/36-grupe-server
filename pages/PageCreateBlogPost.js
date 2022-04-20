import { PageTemplate } from "../lib/PageTemplate.js";

class PageCreateBlogPost extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'auth';
        this.pageJSfileName = 'create-blog-post';
    }

    mainHTML() {
        return `<section class="container">
                    <div class="row">
                        <div class="left">
                            <h1>Create blog post</h1>
                            <form class="form" action="/api/blog">
                                <div class="form-errors"></div>
                                <div class="form-row">
                                    <label for="title">Title</label>
                                    <input id="title" data-validation="title" type="text" placeholder="Post title" required value="">
                                </div>
                                <div class="form-row">
                                    <label for="slug">Slug (URL)</label>
                                    <input id="slug" data-validation="slug" type="text" placeholder="Post URL" required value="">
                                </div>
                                <div class="form-row">
                                    <label for="content">Content</label>
                                    <textarea id="content" data-validation="content" placeholder="Blog content" required></textarea>
                                </div>
                                <div class="form-row">
                                    <button type="submit" class="btn">Create post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>`;
    }
}

export { PageCreateBlogPost };