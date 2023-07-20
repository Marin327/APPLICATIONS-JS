import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as albumsRepo from "../repos/dataRepo.js";

const detailsTemplate = (album, onDelete) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">
                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>

                <!-- Only for registered user and creator of the album-->
                ${album._isOwner ? html`
                    <div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a href="/delete" class="remove" @click="${onDelete}">Delete</a>
                    </div>
                ` :nothing}
            </div>
        </div>
    </section>`;

export function detailsView(ctx) {
    ctx.render(detailsTemplate(ctx.item, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();
        confirm(`Are you sure you want to delete the album: "${ctx.item.name}"?`);
        await albumsRepo.del(ctx.item._id);
        ctx.page.redirect('/catalog');
    }
}
