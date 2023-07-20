import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as eventsRepo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

const detailsTemplate = (event, onDelete, onLike) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${event.title}</h1>
                <div>
                    <img src=${event.imageUrl}/>
                </div>
            </div>

            <div class="details">
                <h3>Theater Description</h3>
                <p>${event.description}</p>
                <h4>Date: ${event.date}</h4>
                <h4>Author: ${event.author}</h4>
                <div class="buttons">
                    ${event._isOwner ? html`
                        <a class="btn-delete" href="/delete/${event._id}" @click=${onDelete}>Delete</a>
                        <a class="btn-edit" href="/edit/${event._id}">Edit</a>` : html`
                        ${ctx.isAuthenticated && !ctx.user.didLike ? html`
                            <a class="btn-like" href="/like/${event._id}" @click=${onLike}>Like</a>` : nothing }
                    `}
                </div>
                <p class="likes">Likes: ${event.likesCount || 0}</p>
            </div>
        </div>
    </section>
`;

let ctx = null

export function detailsView(inCtx) {
    ctx = inCtx;
    ctx.render(detailsTemplate(ctx.item, onDelete, onLike));
}

async function onDelete(ev) {
    ev.preventDefault();
    await eventsRepo.del(ctx.item._id);
    ctx.page.redirect('/profile');
}

async function onLike(ev) {
    ev.preventDefault();
    likesRepo.like(ctx.item._id);
    ctx.page.redirect(`/details/${ctx.item._id}`);
}
