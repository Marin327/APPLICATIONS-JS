import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as albumsRepo from "../repos/dataRepo.js";

const albumTemplate = (album) => html`
    <li class="card">
        <img src=${album.imageUrl} alt="travis" />
        <p>
            <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
        </p>
        <p>
            <strong>Album name: </strong><span class="album">${album.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
        <a class="details-btn" href="/dashboard/${album._id}">Details</a>
    </li>`;

const loginTemplate = (albums) => html`
    <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
            ${albums.length ? html`
                        <ul class="card-wrapper">
                            ${repeat(albums, a => a._id, albumTemplate)}
                        </ul>`
                    : html`<h2>There are no albums added yet.</h2>`}
    </section>

`;

export async function dashboardView(ctx) {
    let albums = await albumsRepo.getAll();
    ctx.render(loginTemplate(albums));
}
