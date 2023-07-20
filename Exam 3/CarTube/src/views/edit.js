import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import * as carsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const editCarTemplate = (car, onSubmit) => html`
    <section id="edit-listing">
        <div class="container">

            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${Number(car.year)}>

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${Number(car.price)}>

                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>

`;

export function editView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(editCarTemplate(ctx.item, handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }
    data.year = Number(data.year);
    data.price = Number(data.price);
    await carsRepo.update(ctx.item._id, data);
    event.target.reset();
    ctx.page.redirect('/listings');
}
