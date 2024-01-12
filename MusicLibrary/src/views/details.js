import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as albumsRepo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

const detailsTemplate = (album, ctx, onDelete, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src=${album.imageUrl} alt="example1"/>
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${album.likesCount || 0}</span></div>

            <!--Edit and Delete are only for creator-->
            ${ctx.isAuthenticated ?
                    html`
                        <div id="action-buttons">
                            ${album._isOwner ? html`
                                        <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                                        <a href="/delete/${album._id}" id="delete-btn" @click=${onDelete}>Delete</a>`
                                    : html`
                                        ${ctx.user.didLike ? nothing : html`<a href="/like/${album._id}" id="like-btn"
                                                                               @click=${onLike}>Like</a>`}`}
                        </div>` : nothing}
        </div>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    ctx.render(detailsTemplate(ctx.item, ctx, onDelete, onLike));

    async function onDelete(ev) {
        ev.preventDefault();
        await albumsRepo.del(ctx.item._id);
        ctx.page.redirect('/dashboard');
    }

    async function onLike(ev) {
        ev.preventDefault();
        const albumId = ctx.item._id;
        await likesRepo.like({albumId});
        ctx.page.redirect('/dashboard/' + albumId);
    }
}
