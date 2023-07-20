import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as gamesRepo from "../repos/dataRepo.js";

const gameInfoTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/catalog/${game._id}" class="details-button">Details</a>
        </div>
    </div>`

const catalogTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${games.length ? repeat(games, g => g._id, gameInfoTemplate)
                : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
`;

export async function catalogView(ctx) {
    const games = await gamesRepo.getAllCatalog();
    ctx.render(catalogTemplate(games));
}
