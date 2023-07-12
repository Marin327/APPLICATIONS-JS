import {cats} from "./catSeeder.js";
import {html, render} from "./node_modules/lit-html/lit-html.js";
import {repeat} from "./node_modules/lit-html/directives/repeat.js";


const templateAsString = (listCats) => html`
    <ul>${repeat(listCats, c => c.id, renderRow)}</ul>`

const renderRow = (cat) => html`
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${onClick}>Show status code</button>
        <div class="status" style="display: none" id="100">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
    </li>`;


start();

function start() {
    render(templateAsString(cats), document.getElementById('allCats'))
}

function onClick(ev) {
    let button = ev.target;
    button.textContent = button.textContent === 'Show status code' ? 'Hide status code' : 'Show status code'
    let div = button.nextElementSibling;
    div.style.display = div.style.display == '' ? 'none' : '';
}