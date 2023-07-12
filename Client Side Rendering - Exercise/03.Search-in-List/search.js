import {towns as townNames} from './towns.js';
import {html, render} from "./node_modules/lit-html/lit-html.js";
import {classMap} from "./node_modules/lit-html/directives/class-map.js";

const towns = townNames.map(t => ({name: t, active: false}))

const listTemplate = (towns) => html`
    <ul>
        ${towns.map(t => html`
            <li class=${classMap({active: t.active})}>${t.name}</li>
        `)}
        <ul>`;

document.querySelector('button')
    .addEventListener('click', onClick);

start();

function start() {
    update();
}

function update() {
    render(listTemplate(towns), document.getElementById('towns'));
}

function onClick() {
    const searchText = document.getElementById('searchText').value;

    const matches = towns
        .map(t => {
            t.active = false;
            return t
        })
        .filter(t => t.name.includes(searchText));

    matches.forEach(t => t.active = true);
    update();

    document.getElementById('result').textContent = `${matches.length} matches found`

}
