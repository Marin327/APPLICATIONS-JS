import { html } from "../lib.js";
import { getAllFacts } from "../api/data.js";

const factTemplate = (fact, hasUser) => html` 
<div class="fact">
<img src=${fact.imageUrl} alt="example1" />
<h3 class="category">${fact.category}</h3>
<p class="description">${fact.description}</p>
<a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`
;

const catalogTemp = (facts, hasUser) => html`
<h2>Fun Facts</h2>
<section id="dashboard">

    ${facts.length > 0 
    ? facts.map(fact => factTemplate(fact, hasUser))
    : html`<h2>No Fun Facts yet.</h2>`}
  
</section> `
 ;

 export async function showCatalog(ctx) {
    const allFacts = await getAllFacts()
    ctx.render(catalogTemp(allFacts, !!ctx.user));
 }