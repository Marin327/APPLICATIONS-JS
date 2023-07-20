import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {login} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="login">
        <form id="login-form" action="" method="" @submit=${onSubmit}>
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;

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
