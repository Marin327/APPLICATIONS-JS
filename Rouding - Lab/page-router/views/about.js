import { render, html } from '../node_modules/lit-html/lit-html.js';

const aboutTemplate = () => html`
    <h1>About</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, exercitationem?</p>
`;

const root = document.getElementById('root');

export const aboutView = (ctx) => {
    render(aboutTemplate(), root);
};