import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as shoesRepo from "../repos/shoes.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (shoes, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onSubmit}>
                <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoes.brand} />
                <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoes.model} />
                <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoes.imageUrl} />
                <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoes.release} />
                <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoes.designer} />
                <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoes.value} />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.shoes, handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }
    await shoesRepo.update(ctx.shoes._id, data);
    event.target.reset();
    ctx.page.redirect(`/dashboard/${ctx.shoes._id}`);
}
