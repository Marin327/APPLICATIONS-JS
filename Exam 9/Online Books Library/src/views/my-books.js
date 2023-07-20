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

const myBooksTemplate = (books) => html`
    <section id="my-books-page" className="my-books">
        <h1>My Books</h1>
        ${books.length ? html`
                    <ul class="my-books-list">
                        ${repeat(books, b => b._id, bookTemplate)}
                    </ul>`
                : html`<p class="no-books">No books in database!</p>`}
    </section>`;

export async function myBooksView(ctx) {
    const books = await booksRepo.getAllByUserId(ctx.user._id);
    ctx.render(myBooksTemplate(books));
}
