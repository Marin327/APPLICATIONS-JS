import {html} from "../../node_modules/lit-html/lit-html.js";
import {register} from "../api/user.js"
import {createSubmitHandler} from "../util.js";

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <article>
            <h2>Register</h2>
            <form id="registerForm" @submit = ${onSubmit}>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>
        </article>
    </section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    if (data.password === data.rePass){
        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/catalog');
    } else {
        alert('Passwords must be the same!');
    }
}
