import {html} from "../../node_modules/lit-html/lit-html.js";
import * as memeRepo from "../repos/memes.js";
import {createSubmitHandler} from "../utils.js";
import {notify} from "../api/notification.js";

const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
        <form id="edit-form" @submit="${onSubmit}">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                    
                        </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"
                       .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" .value="Edit Meme">
            </div>
        </form>
    </section>
`

export function editPage(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.meme, handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required');
        return;
    }
    await memeRepo.update(ctx.params.id, data);
    event.target.reset();
    ctx.page.redirect('/memes')
}
