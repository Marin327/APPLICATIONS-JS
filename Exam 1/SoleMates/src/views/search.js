import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as shoesRepo from "../repos/shoes.js";
import {createSubmitHandler} from "../utils.js";

const foundTemplate = (shoes) => html`
    <li class="card">
        <img src=${shoes.imageUrl} alt="travis"/>
        <p>
            <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
        </p>
        <p>
            <strong>Model: </strong
            ><span class="model">${shoes.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
        ${ctx.isAuthenticated ? html`
            <a class="details-btn" href="/dashboard/${shoes._id}">Details</a>` : nothing
        }
    </li>`;

const searchTemplate = (onSubmit, result) => html`
    <section id="search">
        <h2>Search by Brand</h2>

        <form class="search-wrapper cf" @submit=${onSubmit}>
            <input
                    id="#search-input"
                    type="text"
                    name="search"
                    placeholder="Search here..."
                    required
            />
            <button type="submit">Search</button>
        </form>

        <h3>Results:</h3>

        ${result ?
                result.length ? html`
                            <div id="search-container">
                                <ul class="card-wrapper">
                                    ${repeat(result, r => r._id, foundTemplate)}
                                </ul>
                            </div>`
                        : html`<h2>There are no results found.</h2>`
                : nothing}


    </section>
`;
let ctx = null;

export function searchView(inCtx) {
    ctx = inCtx;
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(searchTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    let handler = createSubmitHandler(ctx, onSubmit);
    const result = await shoesRepo.getAll(data.search);
    ctx.render(searchTemplate(handler, result));
}
