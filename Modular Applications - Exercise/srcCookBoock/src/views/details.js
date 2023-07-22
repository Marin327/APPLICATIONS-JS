import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import {html, nothing} from '../../node_modules/lit-html/development/lit-html.js';

const ingredientTemplate = (item) => html`
    <li>${item}</li>`;

const stepsTemplate = (item) => html`<p>${item}</p>`

const detailsTemplate = (details) => html`
    <section id="details">
        <article>
            <h2>${details.name}</h2>
            <div class="band">
                <div class="thumb"><img src="/${details.img}"></div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${repeat(details.ingredients, (i, ix) => ix, ingredientTemplate)}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${repeat(details.steps, (i, ix) => ix, stepsTemplate)}
            </div>
            ${details._isOwner ? html`
                <div class="controls">
                    <a class="actionLink" href="/edit/${details._id}">✎ Edit</a>
                    <a class="actionLink" href="/delete/${details._id}">✖ Delete</a>
                </div>` : nothing}
        </article>
    </section>`

export async function detailsPage(ctx) {
    const recipe = ctx.recipe;
    ctx.render(detailsTemplate(recipe));
}
