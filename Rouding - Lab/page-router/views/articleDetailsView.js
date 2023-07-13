import { render, html } from '../node_modules/lit-html/lit-html.js';

const articleDetailsTemplate = (article) => html`
    <article>
        <h1>${article.title}</h1>

        <main>
            ${article.content}
        </main>

        <footer>
            <p>Author: ${article.author}</p>
        </footer>
    </article>
`;

const fetchArticle = (articleId) =>
    fetch(`http://localhost:3030/jsonstore/articles/${articleId}`)
        .then(res => res.json());

export const articleDetailsView = (ctx) => {
    console.log('details');
    fetchArticle(ctx.params.articleId)
        .then(article => {
            render(articleDetailsTemplate(article), document.querySelector('#root'))
        });
};