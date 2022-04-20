function contactsSection() {
    return `<section class="container contacts">
                <div class="row">
                    <div class="left">
                        <h2>Let’s scale your brand, together</h2>
                        <p>Get a start@oxo.com</p>
                        <img src="/img/contacts.png" alt="Contacts image">
                    </div>
                    <form class="right form">
                        <div class="form-row">
                            <label for="name">Name</label>
                            <input id="name" type="text" placeholder="Type name" required>
                        </div>
                        <div class="form-row">
                            <label for="phone">Phone</label>
                            <input id="phone" type="tel" placeholder="Type phone number" required>
                        </div>
                        <div class="form-row">
                            <label for="email">Email</label>
                            <input id="email" type="email" placeholder="Type email" required>
                        </div>
                        <div class="form-row">
                            <label for="message">How can we help?</label>
                            <textarea id="message" placeholder="Type message" required></textarea>
                        </div>
                        <div class="form-row">
                            <button type="submit" class="btn">Send message</button>
                        </div>
                    </form>
                </div>
            </section>`;
}

export { contactsSection };