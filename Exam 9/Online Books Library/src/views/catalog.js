import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as booksRepo from "../repos/dataRepo.js";

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/catalog/${book._id}">Details</a>
    </li>`;

const catalogTemplate = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${books.length ? html`
                    <ul class="other-books-list">
                        ${repeat(books, b => b._id, bookTemplate)}
                    </ul>`
                : html`<p class="no-books">No books in database!</p>`}
    </section>`;

export async function catalogView(ctx) {
    const books = await booksRepo.getAll();
    ctx.render(catalogTemplate(books));
}
