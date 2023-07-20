import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import * as eventsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const createTemplate = (onSubmit) => html`
    <section id="createPage">
        <form class="create-form" @submit=${onSubmit}>
            <h1>Create Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
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
    await eventsRepo.create(data);
    event.target.reset();
    ctx.page.redirect('/')
}
