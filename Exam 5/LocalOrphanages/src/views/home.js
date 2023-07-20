import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as postRepo from "../repos/dataRepo.js";

const postTemplate = (post) => html`<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src=${post.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>`;

const homeTemplate = (clothes) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
        ${clothes.length ? html`
            <div class="all-posts">
                ${repeat(clothes, c=>c._id, postTemplate)}
            </div>` : html`<h1 class="title no-posts-title">No posts yet!</h1>`}
    </section>
`;

export async function homeView(ctx) {
    let clothes = await postRepo.getAll();
    ctx.render(homeTemplate(clothes));
}
