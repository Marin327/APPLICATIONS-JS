import {html, nothing} from "../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import * as albumsRepo from "../repos/dataRepo.js";

const albumTemplate = (album)=>html` 
    <div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${ctx.isAuthenticated?html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`: nothing}
    </div>
</div>`;

const loginTemplate = (albums, onClick) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${onClick}>Search</button>
        </div>

        <h2>Results:</h2>
        ${albums ? html`<div class="search-result">
            ${albums.length? repeat(albums, a=>a._id, albumTemplate): html`<p class="no-result">No result.</p>` }
        </div>
        ` : nothing }
    </section>`;


let ctx = null;
export async function searchView(inCtx) {
    const searchElement = document.getElementById('search-input');
    ctx = inCtx;
    let albums = null;
    if (ctx.query.name) {
        albums = await albumsRepo.getAll(ctx.query.name);
        searchElement.value=ctx.query.name;
    }
    ctx.render(loginTemplate(albums, onClick));
}

async function onClick(ev) {
    ev.preventDefault();
    const searchValue = document.getElementById('search-input').value.trim();
    if (searchValue !== '') {
        ctx.page.redirect('/search?name=' + searchValue);
    }
}
