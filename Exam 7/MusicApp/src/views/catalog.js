import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html, nothing} from "../../node_modules/lit-html/lit-html.js";

import * as albumRepository from "../repos/dataRepo.js";

const albumTemplate = (album) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${ctx.isAuthenticated ? html`
                <div class="btn-group">
                    <a href="/catalog/${album._id}" id="details">Details</a>
                </div>
            ` : nothing}
        </div>
    </div>`

const catalogTemplate = (albums) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${albums.length ? repeat(albums, a => a._id, albumTemplate)
                : html`<p>No Albums in Catalog!</p>`}
    </section>`;

let ctx = null;

export async function catalogView(inCtx) {
    ctx = inCtx;
    const albums = await albumRepository.getAll();
    ctx.render(catalogTemplate(albums));
}
