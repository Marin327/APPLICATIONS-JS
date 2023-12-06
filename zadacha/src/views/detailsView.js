import { html, nothing } from "../lib.js";
import { getDetailsById, deleteAlbumById, getLikesByAlbumId, getMyLikesByAlbumId, likeAlbum } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemp = (album, isOwner, onDelete, likes, showLikeButton, onLike) => html` <section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${album.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${likes}</span></div> 

<div id="action-buttons">
    ${albumControlTemplate(album, isOwner, onDelete)}
    ${likesTemplates(showLikeButton, onLike)}
</div>
</div>
</section>`
;
const albumControlTemplate = (album, isOwner, onDelete) => {
    if(isOwner) {
        return html`<a href="/edit/${album._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    } else {
        return null;
    }
};

const likesTemplates = (showLikeButton, onLike) => {
    if(showLikeButton) {
        return html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
    } else {
        return null;
    }
}

export async function showDetails(ctx) {
    let userData = getUserData();
    const id = ctx.params.id;
    const album = await getDetailsById(id);
    const likes = await getLikesByAlbumId(ctx.params.id);
    const hasLike = userData ? await getMyLikesByAlbumId(ctx.params.id, userData._id) : 0;

    const isOwner = album._ownerId == ctx.user?._id;
    const showLikeButton = !isOwner && hasLike == 0 && userData != null;

    ctx.render(detailsTemp(album, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        const userConfirm = confirm("are you sure?")
        if(!userConfirm) {
            return
        }
        await deleteAlbumById(id)
        ctx.page.redirect('/catalog');
    };

    async function onLike() {
        if (userData) {
            await likeAlbum(id);
            ctx.page.redirect('/details/' + id);
        }
    }
}

