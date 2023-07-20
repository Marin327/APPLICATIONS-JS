import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import {didUserApplied} from "../repos/applicationsRepo.js";
import * as offerService from "../repos/dataRepo.js";
import * as applicationRepo from "../repos/applicationsRepo.js";

const detailsTemplate = (offer, onDelete, onApply) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1"/>
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span
                    >
                </div>
            </div>
            <p>Applications: <strong id="applications">${offer.applicationsCount}</strong></p>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${offer._isOwner ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                <a href="" id="delete-btn" @click=${onDelete}>Delete</a>` : nothing}
                ${!offer._isOwner && ctx.isAuthenticated && !offer.userApplied ? html`<a href="" id="apply-btn" @click = ${onApply}>Apply</a>`: nothing}
            </div>
        </div>
    </section>
`;

let ctx = null;

export async function detailsView(inCtx) {
    ctx = inCtx;
    ctx.render(detailsTemplate(ctx.item, onDelete, onApply));
}

async function onDelete(ev) {
    ev.preventDefault();
    await offerService.del(ctx.item._id);
    ctx.page.redirect('/dashboard');
}

async function onApply(ev) {
    ev.preventDefault();
    await applicationRepo.create({offerId: ctx.item._id, _ownerId: ctx.user.id});
    ctx.page.redirect(`/dashboard/${ctx.item._id}`);
}
