import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <div class="container">
            <form id="register-form" @submit=${onSubmit}>
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`;

export function registerView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(registerTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    if (data.password !== data.repeatPass) {
        notify('Passwords must be the same!');
        return;
    }
    await register(data.username, data.password);
    event.target.reset();
    ctx.page.redirect('/');
}
