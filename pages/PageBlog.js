import { file } from "../lib/file.js";
import { PageTemplate } from "../lib/PageTemplate.js";
import { utils } from "../lib/utils.js";

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

    async getBlogData() {
        const [listErr, list] = await file.list('blog');
        if (listErr) {
            return [];
        }

        const blogData = [];

        for (const fileName of list) {
            if (fileName[0] === '.') {
                continue;
            }

            const [readErr, readContent] = await file.read('blog', fileName);
            if (readErr) {
                continue;
            }

            const obj = utils.parseJSONtoObject(readContent);
            if (!obj) {
                continue;
            }
            blogData.push(obj);
        }

        return blogData.sort((a, b) => b.lastUpdated - a.lastUpdated);
    }

    emptyListHTML() {
        return `<div class="row empty-list">Looks like blog list is empty right now 🤔👀😭</div>`;
    }

    blogListHTML(data) {
        let HTML = '';

        for (const post of data) {
            HTML += `<div class="post">
                        <h2 class="post-title">${post.title}</h2>
                        <div class="post-description">${this.shortenText(post.content)}</div>
                        <a href="/blog/${post.slug}" class="read-more">Read more<i class="icon fa fa-angle-right"></i></a>
                    </div>`;
        }

        return `<div class="row list">${HTML}</div>`;
    }

    shortenText(text) {
        const limit = 100;
        const hardLimit = 130;
        if (text.length < hardLimit) {
            return text;
        }

        let partText = text.slice(0, limit);
        partText = partText.split('').reverse().join('');
        partText = partText.slice(partText.indexOf(' ') + 1);
        partText = partText.split('').reverse().join('');

        return partText + '...';
    }

    async mainHTML() {
        const blogFiles = await this.getBlogData();
        return `<section class="container blog-list">
                    <h1 class="row title">My blog</h1>
                    ${blogFiles.length === 0 ? this.emptyListHTML() : this.blogListHTML(blogFiles)}
                </section>`;
    }
}

export { PageBlog };