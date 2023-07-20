import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as gamesRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const createTemplate = (onSubmit) => html`
    <section id="create-page" class="auth">
        <form id="create" @submit=${onSubmit}>
            <div class="container">
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>`;

export function createView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(createTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await gamesRepo.create(data);
    event.target.reset();
    ctx.page.redirect('/')
}
