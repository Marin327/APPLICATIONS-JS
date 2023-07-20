import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import * as postsRepo from "../repos/dataRepo.js";
import * as donateRepo from "../repos/donationsRepo.js";

const homeTemplate = (post, onDelete, onDonate) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>

        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${post.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${post.donationsCount}</p>

                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        ${post._isOwner ? html`
                                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                                    <a href="/delete/${post._id}" class="delete-btn btn" @click=${onDelete}>Delete</a>`
                                : nothing}


                        <!--Bonus - Only for logged-in users ( not authors )-->
                        ${ctx.isAuthenticated && !post.madeDonation && !post._isOwner ? html`<a
                                href="/donate/${post._id}"
                                class="donate-btn btn" @click=${onDonate}>Donate</a>` : nothing}
                    </div>

                </div>
            </div>
        </div>
    </section>`;

let ctx = null;

export async function detailsView(inCtx) {
    ctx = inCtx;
    let post = ctx.item;
    if (!post.hasOwnProperty('donationsCount')) {
        post.donationsCount = 0;
    }
    ctx.render(homeTemplate(post, onDelete, onDonate));
}

async function onDelete(ev) {
    ev.preventDefault();
    if (confirm('Are you shore you want to delete post?')) {
        await postsRepo.del(ctx.item._id);
        ctx.page.redirect('/');
    }
}

async function onDonate(ev) {
    ev.preventDefault();
    await donateRepo.donate(ctx.item._id);
    ctx.page.redirect(`/details/${ctx.item._id}`);
}
