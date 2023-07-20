import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as odderService from "../repos/dataRepo.js";

const offerTemplate = (offer)=>html`
    <div class="offer">
        <img src=${offer.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/dashboard/${offer._id}">Details</a>
    </div>
`;
const dashboardTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${offers?.length ? repeat(offers, o => o._id, offerTemplate) : html`<h2>No offers yet.</h2>`}
    </section>`;

export async function dashboardView(ctx) {
    let offers = await odderService.getAll();
    ctx.render(dashboardTemplate(offers));
}
