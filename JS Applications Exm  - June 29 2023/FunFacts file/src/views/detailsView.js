import { deleteFactById, getDetailsById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemp = (fact, isOwner, onDelete) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${fact.imageUrl} alt="example1" />
  <p id="details-category">${fact.category}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p id="description">
        ${fact.description}
        </p>
         <p id ="more-info">
            ${fact.moreInfo}
              </p>
    </div>

    <h3>Likes:<span id="likes">0</span></h3>
${isOwner 
    
? html`
<div id="action-buttons"> 
    <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>`
            :nothing}

<a href="" id="like-btn">Like</a>
  </div>
</div>
</section>`
;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const fact = await getDetailsById(id);
    if(!fact) {
      ctx.page.redirect('/404');
      return;
    };

    const isOwner = fact._ownerId == ctx.user?._id || false;;
    ctx.render(detailsTemp(fact, isOwner, onDelete));

    async function onDelete() {
        const userConfirm = confirm('Are you sure?')
        if(!userConfirm) {
            return;
        }
        await deleteFactById(id);
        ctx.page.redirect('/catalog')
    }
}