import {html} from '../../node_modules/lit-html/lit-html.js';
import {createSubmitHandler} from "../util.js";
import * as recipeService from "../api/recipe.js";

const editTemplate = (recipe, onSubmit) => html`
    <section id="create">
        <article>
            <h2>Edit Recipe</h2>
            <form id="editForm" @submit=${onSubmit} data-id = ${recipe._id}>
                <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
                <label class="ml">Ingredients: <textarea name="ingredients"
                                                         placeholder="Enter ingredients on separate lines"
                                                         .value=${recipe.ingredients.join('\n')}></textarea></label>
                <label class="ml">Preparation: <textarea name="steps"
                                                         placeholder="Enter preparation steps on separate lines"
                                                         .value=${recipe.steps.join('\n')}></textarea></label>
                <input type="submit" value="Save Changes">
            </form>
        </article>
    </section>
`;

export function editPage(ctx){
    ctx.render(editTemplate(ctx.recipe, createSubmitHandler(ctx, onSubmit)))
}

async function onSubmit(ctx, data, event) {
    data.ingredients = data.ingredients.split('\n');
    data.steps = data.steps.split('\n');
    await recipeService.update(event.target.dataset.id, data);
    event.target.reset();
    ctx.page.redirect('/catalog');
}
