import {html} from "../../node_modules/lit-html/lit-html.js";
import {login} from "../api/data/cars.js";
import {setUserData} from "../api/users_store.js";

const loginTemplate = (onLogin) => html`
    <h2>Login</h2>
    <form @submit=${onLogin}>
        <label>Email: <input type="text" name="email"/></label>
        <label>Password <input type="password" name="password"></label>
        <input type="submit" value="Login">
    </form>`;

export function showLogin(ctx) {

    ctx.render(loginTemplate(onLogin));


    async function onLogin(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const user = Object.fromEntries(formData);
        setUserData(await login(user));
        ctx.page.redirect('/');
    }
}
