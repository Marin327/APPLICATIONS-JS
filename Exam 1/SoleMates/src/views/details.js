import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as shoesRepo from "../repos/shoes.js";

const detailsTemplate = (shoes, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
                <img src=${shoes.imageUrl} alt="example1"/>
            </div>
            <div id="info-wrapper">
                <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
                <p>
                    Model: <span id="details-model">${shoes.model}</span>
                </p>
                <p>Release date: <span id="details-release">${shoes.release}</span></p>
                <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
                <p>Value: <span id="details-value">${shoes.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${shoes._isOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${shoes._id}" id="edit-btn">Edit</a>
                    <a href="#" id="delete-btn" @click = ${onDelete}>Delete</a>
                </div>` : nothing}
        </div>
    </section>`;

let ctx = null;
export function detailsView(inCtx) {
    ctx = inCtx;
    ctx.render(detailsTemplate(ctx.shoes, onDelete));
}

async function onDelete(ev) {
    ev.preventDefault();
    await shoesRepo.del(ctx.shoes._id);
    ctx.page.redirect('/dashboard');
}
