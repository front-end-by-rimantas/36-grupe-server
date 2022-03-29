import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    mainHTML() {
        return `404 PAGE CONTENT`;
    }
}

export { Page404 }