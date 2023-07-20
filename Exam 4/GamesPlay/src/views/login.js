import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {login} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${onSubmit}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>`;

export function loginView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(loginTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('Email and password are required');
        return;
    }
    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/')

}
