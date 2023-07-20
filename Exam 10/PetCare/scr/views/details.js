import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as petsRepo from "../repos/dataRepo.js";
import * as donateRepo from "../repos/donationRepo.js";
import {donate} from "../repos/donationRepo.js";

const detailsTemplate = (pet, onDelete, onDonate) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age}</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: ${pet.donations}$</h4>
                </div>
                <!-- if there is no registered user, do not display div-->
                ${ctx.isAuthenticated ?
                        html`
                            <div class="actionBtn">
                                <!-- Only for registered user and creator of the pets-->
                                ${pet._isOwner ? html`
                                    <a href="/edit/${pet._id}" class="edit">Edit</a>
                                    <a href="/delete/${pet.id}" class="remove" @click=${onDelete}>Delete</a>
                                ` : html`${!ctx.user.didDonation ? html`<a href="/donate" class="donate" @click=${onDonate}>Donate</a>`: nothing}`
                                }
                            </div>` : nothing}
            </div>
        </div>
    </section>`;

let ctx = null;

export async function detailsView(inCtx) {
    ctx = inCtx;
    ctx.item.donation = 0;
    ctx.render(detailsTemplate(ctx.item, onDelete, onDonate));
}

async function onDelete(ev) {
    ev.preventDefault();
    await petsRepo.del(ctx.item._id);
    ctx.page.redirect('/');
}

async function onDonate(ev) {
    ev.preventDefault();
    const petId = ctx.item._id;
    await donateRepo.donate({petId});
    ctx.page.redirect(`/catalog/${petId}`);
}
