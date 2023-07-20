import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import * as carsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const createCarTemplate = (onSubmit) => html`
    <section id="create-listing">
        <div class="container">
            <form id="create-form" @submit=${onSubmit}>
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>

                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">

                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">

                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">

                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">

                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">

                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">

                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
`;

export function createView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(createCarTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }
    data.year = Number(data.year);
    data.price = Number(data.price);
    await carsRepo.create(data);
    event.target.reset();
    ctx.page.redirect('/listings');
}
