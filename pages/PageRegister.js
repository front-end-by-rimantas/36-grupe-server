import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
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
                            <h1>Register</h1>
                            <form class="form" action="/api/account">
                                <div class="form-errors"></div>
                                <div class="form-row">
                                    <label for="username">Username</label>
                                    <input id="username" data-validation="username" type="text" placeholder="Type username" required value="Chuck">
                                </div>
                                <div class="form-row">
                                    <label for="email">Email</label>
                                    <input id="email" data-validation="email" type="email" placeholder="Type email" required value="chuck@norris.com">
                                </div>
                                <div class="form-row">
                                    <label for="pass">Password</label>
                                    <input id="pass" data-validation="password" type="password" placeholder="Type password" required value="chuckchuckchuck">
                                </div>
                                <div class="form-row">
                                    <label for="repass">Repeat password</label>
                                    <input id="repass" data-validation="password" type="password" placeholder="Type password" required value="chuckchuckchuck2">
                                </div>
                                <div class="form-row">
                                    <button type="submit" class="btn">Create account</button>
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

export { PageRegister };