import {html} from '../../node_modules/lit-html/lit-html.js';
import {create} from "../api/recipe.js";
import {createSubmitHandler} from "../util.js";

const createTemplate = (onSubmit) => html`
    <section id="create">
        <article>
            <h2>New Recipe</h2>
            <form id="createForm" @submit="${onSubmit}">
                <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    data.ingredients = data.ingredients.split('\n');
    data.steps = data.steps.split('\n');
    await create(data);
    event.target.reset();
    ctx.page.redirect('/catalog');
}
