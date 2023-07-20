import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as postsRepo from "../repos/dataRepo.js";

import {createSubmitHandler} from "../utils.js";

const editTemplate = (post,onSubmit) => html`
    <section id="edit-page" class="auth">
        <form id="edit" @submit=${onSubmit}>
            <h1 class="title">Edit Post</h1>

            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" .value=${post.title}>
            </article>

            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" .value=${post.description}>
            </article>

            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" .value=${post.imageUrl}>
            </article>

            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" .value=${post.address}>
            </article>

            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" .value=${post.phone}>
            </article>

            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.item,handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await postsRepo.update(ctx.item._id,data);
    event.target.reset();
    ctx.page.redirect('/')
}
