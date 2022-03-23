class PageTemplate {
    constructor() {
    }

    headHTML() {
        return `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>`;
    }

    headerHTML() {
        return `<header>
                    <img src="#" alt="Logo">
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">Blog</a>
                        <a href="#">Register</a>
                        <a href="#">Login</a>
                    </nav>
                </header>`;
    }

    footerHTML() {
        return `<footer>Copyright &copy; 2022</footer>`;
    }

    render() {
        return `<!DOCTYPE html>
                <html lang="en">
                    ${this.headHTML()}
                    <body>
                        ${this.headerHTML()}
                        <main>
                            <h1>Labas</h1>
                            <p>Kaip tau sekasi?</p>
                        </main>
                        ${this.footerHTML()}
                    </body>
                </html>`;
    }
}

export { PageTemplate }