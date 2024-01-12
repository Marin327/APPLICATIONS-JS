import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit = ${onSubmit}>
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`;

export function registerView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(registerTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    if (data.password !== data['re-password']) {
        notify('Passwords must be the same!');
        return;
    }
    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/dashboard')
}
