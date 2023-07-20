import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as carsRepository from "../repos/dataRepo.js";

import {createSubmitHandler} from "../utils.js";

const carTemplate = (car) => html` <div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

const carsListTemplate = (cars) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">

            <!-- Display all records -->
           ${cars.length ? repeat(cars, c=>c._id, carTemplate):html`<p class="no-cars">No cars in database.</p>` }
        </div>
    </section>

`;

export async function listingsView(ctx) {
    let cars = await carsRepository.getAll();
    ctx.render(carsListTemplate(cars));
}
