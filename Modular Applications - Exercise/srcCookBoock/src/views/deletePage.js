import {deleteRecipe} from "../api/recipe.js";

export async function deletePage(ctx) {
    const recipeId = ctx.params.id;
    await deleteRecipe(recipeId);
    ctx.page.redirect('/catalog');
}
