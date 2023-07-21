import {html} from "../../node_modules/lit-html/lit-html.js";

const homeView = () => html`
    <h2>Home Page</h2>
    <p>Welcome to out site!</p>`;

export function showHome(ctx) {
    ctx.render(homeView());
}
