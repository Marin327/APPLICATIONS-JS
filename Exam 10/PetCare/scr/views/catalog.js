import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as petsRepo from "../repos/dataRepo.js";

const petTemplate = (pet) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${pet.image}>
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/catalog/${pet._id}">Details</a>
        </div>
    </div>`;

const catalogTemplate = (catalog) => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${catalog.length ? html`${repeat(catalog, p => p._id, petTemplate)}`
                    : html`
                        <div>
                            <p class="no-pets">No pets in dashboard</p>
                        </div>`}
        </div>
    </section>`;

export async function catalogView(ctx) {
    let catalog = await petsRepo.getAll();
    ctx.render(catalogTemplate(catalog));
}
