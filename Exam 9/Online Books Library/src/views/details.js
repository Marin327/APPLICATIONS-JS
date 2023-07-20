import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {login} from "../api/users.js";
import * as booksRepo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

const detailsTemplate = (book, onDelete, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${book._isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                        <a class="button" href="/delete/${book._id}" @click=${onDelete}>Delete</a>` :
                        ctx.isAuthenticated && !ctx.user.didLike ? html` <a class="button" href="/like" @click=${onLike}>Like</a>` : nothing}

                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${book.likesCount || 0}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`;

let ctx = null;

export function detailsView(inCtx) {
    ctx = inCtx;
    ctx.render(detailsTemplate(ctx.item, onDelete, onLike));
}

async function onDelete(ev) {
    ev.preventDefault();
    await booksRepo.del(ctx.item._id);
    ctx.page.redirect('/');
}

async function onLike(ev) {
    ev.preventDefault();
    const bookId = ctx.item._id;
    await likesRepo.like({bookId});
    ctx.page.redirect(`/catalog/${bookId}`);
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('Email and password are required');
        return;
    }
    await login(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/')
}
