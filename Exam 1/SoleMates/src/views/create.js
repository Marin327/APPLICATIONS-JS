import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {create} from "../repos/shoes.js";
import * as shoesRepo from "../repos/shoes.js";
import {createSubmitHandler} from "../utils.js";

const createTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${onSubmit}>
                <input
                        type="text"
                        name="brand"
                        id="shoe-brand"
                        placeholder="Brand"
                />
                <input
                        type="text"
                        name="model"
                        id="shoe-model"
                        placeholder="Model"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="shoe-img"
                        placeholder="Image url"
                />
                <input
                        type="text"
                        name="release"
                        id="shoe-release"
                        placeholder="Release date"
                />
                <input
                        type="text"
                        name="designer"
                        id="shoe-designer"
                        placeholder="Designer"
                />
                <input
                        type="text"
                        name="value"
                        id="shoe-value"
                        placeholder="Value"
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`;

export function createView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(createTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }
    await shoesRepo.create(data);
    event.target.reset();
    ctx.page.redirect(`/dashboard`);
}
