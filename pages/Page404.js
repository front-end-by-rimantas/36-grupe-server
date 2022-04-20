import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
    }

    mainHTML() {
        return `<section class="container hero">
                    <div class="row">
                        <div class="left">
                            <h1>404</h1>
                            <p>Page not found</p>
                            <a href="/" class="btn">Go back home</a>
                        </div>
                        <div class="right">
                            <img src="/img/hero.png" alt="Hero image">
                        </div>
                    </div>
                </section>`;
    }
}

export { Page404 };