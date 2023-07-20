import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as eventsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (event, onSubmit) => html`
    <section id="editPage">
        <form class="theater-form" @submit=${onSubmit}>
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value=${event.title}>
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${event.date}>
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" .value=${event.author}>
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description"
                          .value=${event.description}></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${event.imageUrl}>
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.item, handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }
    const eventId = ctx.item._id;
    await eventsRepo.update(eventId, data);
    event.target.reset();
    ctx.page.redirect(`/details/${eventId}`);
}
