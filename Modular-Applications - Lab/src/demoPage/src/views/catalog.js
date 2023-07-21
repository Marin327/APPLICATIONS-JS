import {html} from "../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {getAllCars} from "../api/data/cars.js";
import {createSubmitHandler} from "../utils.js";

const recipeTemplate = (car) => html`
    <li><a href="/catalog/${car._id}">${car.make} - ${car.model}</a></li>`

const catalogTemplate = (cars, pager, searcher) => html`
    <h2>Catalog</h2>
    ${searcher}
    <ul>
        ${repeat(cars, c => c._id, recipeTemplate)}
    </ul>
    ${pager}
`;


const pagerTemplate = (page, pages) => html`
    <div>
        ${page > 1 ? html`<a href="?page=${page - 1}">&lt; Prev</a>` : html`<a>&lt; Prev</a>`}
        <span>Page: ${page} </span>
        ${page < pages ? html`<a href="?page=${page + 1}">Next &gt;</a>` : html`<a>Next &gt;</a>`}
    </div>`;

const searchTemplate = (onSubmit, search) => html`
    <form @submit=${onSubmit}>
        <label>Search: <input type="text" name="search" value=${search}> <input type="submit" value="search"></label>
    </form>
`

export async function showCatalog(ctx) {

    ctx.render(until(catalogWrapper(ctx), "Loading..."));

}

async function catalogWrapper(ctx) {
    const page = Number(ctx.query.page) || 1;
    const search = ctx.query.search || '';

    const {cars, pages} = await getAllCars(search, page);
    return catalogTemplate(
        cars,
        pagerTemplate(page, pages),
        searchTemplate(createSubmitHandler(onSubmit), search));

    function onSubmit(data) {
        let redirectUrl = data.search === '' ? '/catalog'
            : `/catalog?search=${data.search}`;
        ctx.page.redirect(redirectUrl);
    }
}
