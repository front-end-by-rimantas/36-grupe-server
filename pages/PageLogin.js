import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogin extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'auth';
        this.pageJSfileName = 'auth';
    }

    mainHTML() {
        return `<section class="container hero">
                    <div class="row">
                        <div class="left">
                            <h1>Login</h1>
                            <form class="form" action="/api/token">
                                <div class="form-errors"></div>
                                <div class="form-row">
                                    <label for="email">Email</label>
                                    <input id="email" data-validation="email" type="text" placeholder="Type email" value="chuck@norris.com" required>
                                </div>
                                <div class="form-row">
                                    <label for="pass">Password</label>
                                    <input id="pass" data-validation="password" type="password" placeholder="Type password" value="chuckchuckchuck" required>
                                </div>
                                <div class="form-row">
                                    <button type="submit" class="btn">Log in</button>
                                </div>
                            </form>
                        </div>
                        <div class="right">
                            <img src="../img/hero.png" alt="Hero image">
                        </div>
                    </div>
                </section>`;
    }
}

export { PageLogin };