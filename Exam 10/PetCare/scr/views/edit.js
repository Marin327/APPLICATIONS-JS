import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as petsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const editTemplate = (pet, onSubmit) => html`
    <section id="editPage">
        <form class="editForm" @submit=${onSubmit}>
            <img src=${pet.image}>
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" value="Max" .value=${pet.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" value="Shiba Inu" .value=${pet.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value="2 years" .value=${pet.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" value="5kg" .value=${pet.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" value="./image/dog.jpeg" .value=${pet.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
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
    await petsRepo.update(ctx.item._id, data);
    event.target.reset();
    ctx.page.redirect('/')
}
