import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const registerTemplate = (onSubmit) => html`
    <section id="register-page" class="register">
        <form id="register-form" action="" method="" @submit=${onSubmit}>
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
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

    if (data.password !== data['confirm-pass']) {
        notify('Passwords must be the same!');
        return;
    }
    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/')
}
