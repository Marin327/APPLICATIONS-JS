import {html} from "../../node_modules/lit-html/lit-html.js";
import * as memeRepo from "../repos/memes.js";
import {createSubmitHandler} from "../utils.js";
import {notify} from "../api/notification.js";

const createTemplate = (onSubmit) => html`
    <section id="create-meme">
        <form id="create-form" @submit = ${onSubmit}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`

export function createPage(ctx){
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(createTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required');
        return;
    }
    await memeRepo.create(data);
    event.target.reset();
    ctx.page.redirect('/memes')
}
