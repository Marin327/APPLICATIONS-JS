import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as gamesRepo from "../repos/dataRepo.js";
import * as commentsRepo from "../repos/commentsRepo.js";
import {createSubmitHandler} from "../utils.js";

const commentTemplate = (comment) => html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>`;

const detailsTemplate = (game, onDelete, onSubmit) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">

            <div class="game-header">
                <img class="game-img" src=${game.imageUrl}/>
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>

            <p class="text">
                ${game.summary}
            </p>

            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
                ${game.comments?.length ? html`
                    <ul>
                        ${repeat(game.comments, c => c._id, commentTemplate)}
                    </ul>
                ` : html`<p class="no-comment">No comments.</p>
                `}
                <ul>
            </div>

            ${game._isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a href="/delete/${game._id}" class="button" @click=${onDelete}>Delete</a>
                </div>` : html`
                ${ctx.isAuthenticated? html`
                    <article class="create-comment">
                        <label>Add new comment:</label>
                        <form class="form" @submit=${onSubmit}>
                            <textarea name="comment" placeholder="Comment......"></textarea>
                            <input class="btn submit" type="submit" value="Add Comment">
                        </form>
                    </article>
                `:nothing}
            `}
        </div>
    </section>`;

let ctx = null;

export async function detailView(inCtx) {
    ctx = inCtx;
    const handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(detailsTemplate(ctx.item, onDelete, handler));
}

async function onDelete(ev) {
    ev.preventDefault();
    await gamesRepo.del(ctx.item._id);
    ctx.page.redirect('/');
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('Email and password are required');
        return;
    }
    await commentsRepo.create({gameId: ctx.item._id, comment: data.comment });
    event.target.reset();
    ctx.page.redirect(`/catalog/${ctx.item._id}`);
}
