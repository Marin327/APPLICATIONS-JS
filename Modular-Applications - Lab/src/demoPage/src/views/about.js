import {html} from "../../node_modules/lit-html/lit-html.js";

const aboutTemplate = () => html`
    <h2>About Us</h2>
    <p>+1-555-12345</p>`;

export function showAbout(ctx) {
    ctx.render(aboutTemplate());
}
