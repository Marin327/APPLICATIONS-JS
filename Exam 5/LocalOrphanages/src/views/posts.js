import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as postRepo from "../repos/dataRepo.js";

const postTemplate = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`;

const postsTemplate = (clothes) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
        <div class="my-posts">
            ${clothes.length ? html`
                <div class="all-posts">
                    ${repeat(clothes, c => c._id, postTemplate)}
                </div>` : html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
        </div>
    </section>
`;


export async function postsView(ctx) {
    let clothes = await postRepo.getMy(ctx.user._id);
    ctx.render(postsTemplate(clothes));
}
