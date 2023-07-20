import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as carsRepo from "../repos/dataRepo.js";

const detailsTemplate = (car, onDelete) => html`
    <section id="listing-details">
        <h1>Details</h1>
        <div class="details-info">
            <img src=${car.imageUrl}>
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${car.brand}</li>
                <li><span>Model:</span>${car.model}</li>
                <li><span>Year:</span>${car.year}</li>
                <li><span>Price:</span>${car.price}$</li>
            </ul>

            <p class="description-para">${car.description}</p>

            ${car._isOwner ? html`<div class="listings-buttons">
                <a href="/edit/${car._id}" class="button-list">Edit</a>
                <a href="/delete/${car._id}" class="button-list" @click=${onDelete}>Delete</a>
            </div>` : nothing}
        </div>
    </section>`;

export function detailsView(ctx) {
    ctx.render(detailsTemplate(ctx.item, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();
        await carsRepo.del(ctx.item._id);
        ctx.page.redirect('/listings');
    }
}
