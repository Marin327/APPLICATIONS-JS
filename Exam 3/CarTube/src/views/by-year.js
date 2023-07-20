import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as carsRepo from "../repos/dataRepo.js";

const carTemplate = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src="${car.imageUrl}">
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

const carsListTemplate = (cars, onClick) => html`
    <section id="search-cars">
        <h1>Filter by year</h1>

        <div class="container">
            <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
            <button class="button-list" @click=${onClick}>Search</button>
        </div>

        <h2>Results:</h2>
        <div class="listings">
            ${cars ? html`
                ${cars.length ? repeat(cars, c => c._id, carTemplate)
                        : html`<p class="no-cars"> No results.</p>`}` : nothing}
        </div>
    </section>

`;

export async function searchView(ctx) {
    const year = Number(ctx.query.year);
    let cars = null;
    if (year > 0) {
        document.getElementById('search-input').value = year;

        cars = await carsRepo.getAllByYear(year);
    }

    ctx.render(carsListTemplate(cars, onClick));

    function onClick(ev) {
        ev.preventDefault();
        const year = Number(document.getElementById('search-input').value);
        ctx.page.redirect('/by-year?year=' + year);
    }
}
