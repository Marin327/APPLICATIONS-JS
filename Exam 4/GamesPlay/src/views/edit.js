import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as gamesRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (game, onSubmit) => html`
    <section id="edit-page" class="auth">
        <form id="edit" @submit=${onSubmit}>
            <div class="container">

                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value=${game.title}>

                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value=${game.category}>

                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary" .value=${game.summary}></textarea>
                <input class="btn submit" type="submit" value="Edit Game">

            </div>
        </form>
    </section>
`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editTemplate(ctx.item, handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    await gamesRepo.update(ctx.item._id, data);
    event.target.reset();
    ctx.page.redirect('/')
}
