import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as memeRepo from "../repos/memes.js";

const detailsTemplate = (meme, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}

        </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                    ${meme.description}
                </p>

                ${meme._isOwner ? html`
                            <a class="button warning" href="/edit/${meme._id}">Edit</a>
                            <button class="button danger" @click=${onDelete}>Delete</button>` :
                        nothing
                }
            </div>
        </div>
    </section>`;

let ctx = null;

export function detailsPage(inCtx) {
    ctx = inCtx;
    ctx.render(detailsTemplate(ctx.meme, onDelete));
}

async function onDelete() {
    await memeRepo.del(ctx.meme._id);
    ctx.page.redirect('/memes');
}
