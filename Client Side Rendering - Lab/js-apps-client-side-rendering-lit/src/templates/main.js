
import { html } from '../../node_modules/lit-html/lit-html.js';
import navbarTemplate from './navbar.js';
import contactListTemplate from './contactList.js';

const mainTemplate = (ctx) => html`
    <header>
        ${navbarTemplate(ctx)}
    </header>
    <main>
        ${contactListTemplate(ctx)}
    </main>
`;

export default mainTemplate;