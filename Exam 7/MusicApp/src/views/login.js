import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {login} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const loginTemplate = (onSubmit) => html`
    <section id="loginPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
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
