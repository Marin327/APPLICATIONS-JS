import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as shoesRepo from "../repos/shoes.js";

const shoesTemplate = (shoes) => html`
    <li class="card">
        <img src="${shoes.imageUrl}" alt="back2future"/>
        <p><strong>Brand: </strong><span class="brand">${shoes.brand}</span></p>
        <p>
            <strong>Model: </strong
            ><span class="model">${shoes.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
        <a class="details-btn" href="/dashboard/${shoes._id}">Details</a>
    </li>
`

const dashboardTemplate = (shoesList) => html`
    <section id="dashboard">
        <h2>Collectibles</h2>
        ${shoesList.length ? html`
            <ul class="card-wrapper">
                <!-- Display a li with information about every post (if any)-->
                ${repeat(shoesList, s=> s._id, shoesTemplate)}
            </ul>` : html`<h2>There are no items added yet.</h2>`
        }
    </section>`;

export async function dashboardView(ctx) {
    const data = await shoesRepo.getAll()
    ctx.render(dashboardTemplate(data));
}
