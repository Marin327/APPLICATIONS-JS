import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as offerService from "../repos/dataRepo.js"
import {createSubmitHandler} from "../utils.js";

const registerTemplate = (onSubmit) => html`
    <section id="create">
        <div class="form" @submit = ${onSubmit}>
            <h2>Create Offer</h2>
            <form class="create-form">
                <input type="text" name="title" id="job-title" placeholder="Title"/>
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url"/>
                <input type="text" name="category" id="job-category" placeholder="Category"/>
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary"/>

                <button type="submit">post</button>
            </form>
        </div>
    </section>`;

export function createOfferView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(registerTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await offerService.create(data);
    event.target.reset();
    ctx.page.redirect('/dashboard');
}
