import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as albumsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (album, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form class="edit-form" @submit=${onSubmit}>
                <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer}/>
                <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album}/>
                <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl}/>
                <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release}/>
                <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label}/>
                <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales}/>

                <button type="submit">post</button>
            </form>
        </div>
    </section>

`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.item,handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await albumsRepo.update(ctx.item._id, data);
    event.target.reset();
    ctx.page.redirect('/dashboard')
}
