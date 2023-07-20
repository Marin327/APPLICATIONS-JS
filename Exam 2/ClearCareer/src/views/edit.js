import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as offerService from "../repos/dataRepo.js"
import {createSubmitHandler} from "../utils.js";

const editTemplate = (offer, onSubmit) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onSubmit}>
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                        .value=${offer.title}
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                        .value=${offer.imageUrl}
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                        .value=${offer.category}
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                        .value=${offer.description}
                ></textarea>
                <textarea
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        rows="4"
                        cols="50"
                        .value=${offer.requirements}
                ></textarea>
                <input
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                        .value=${offer.salary}
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>`;

export function editOfferView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.item,handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await offerService.update(ctx.item._id, data);
    event.target.reset();
    ctx.page.redirect('/dashboard');
}
