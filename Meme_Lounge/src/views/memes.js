import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as memesService from "../repos/memes.js";

const memeCard = (meme) =>html`
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${meme.title}</p>
                    <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href="/memes/${meme._id}">Details</a>
                </div>
            </div>
        </div>
`

const memesTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        ${memes.length ?
        repeat(memes, m=>m._id, memeCard)        
                :html`<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>`;

export async function memesPage(ctx) {
    const memes = await memesService.getAll()
    ctx.render(memesTemplate(memes));
}
