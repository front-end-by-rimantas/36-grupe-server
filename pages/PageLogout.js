import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogout extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.isLogoutPage = true;
        this.data.user.isLoggedIn = false;
    }

    mainHTML() {
        return `<section class="container hero">
                    <div class="row">
                        <div class="left">
                            <h1>Logout</h1>
                            <p>You have been successfully logged out</p>
                            <a href="/" class="btn">Go back home</a>
                        </div>
                        <div class="right">
                            <img src="/img/hero.png" alt="Hero image">
                        </div>
                    </div>
                </section>`;
    }
}

export { PageLogout };