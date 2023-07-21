import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {cache} from "../../node_modules/lit-html/directives/cache.js";
import {getCars} from "../api/data/cars.js";
import {commentsView} from "./comments.js";


const detailsTemplate = (car, commentsSection) => html`
    <p>Make: ${car.make}</p>
    <p>Model: ${car.model}</p>
    ${commentsSection}`;

let carCache = null;
let currentCarId = null;

export async function showDetails(ctx) {
    ctx.render(until(detailWrapper(ctx), 'Loading...'));
}

async function detailWrapper(ctx) {
    const id = ctx.params.id;
    if (carCache == null || id !== currentCarId) {
        carCache = await getCars(id);
        currentCarId = id;
    }

    const car = carCache;
    return cache(detailsTemplate(car, commentsView(ctx)));
}
