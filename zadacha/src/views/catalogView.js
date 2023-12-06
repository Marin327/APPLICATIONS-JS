import { getAllAlbums } from "../api/data.js";
import { html } from "../lib.js";

const cardTemp = (album) => html`
  <li class="card">
    <img src=${album.imageUrl} alt="album cover" />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    
      <a href="/details/${album._id}" class="details-btn" href="">Details</a>
    
  </li>
`;

const catalogTemp = (albums, hasUser) => html`
  <section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every album (if any) -->
      ${albums.length > 0
        ? albums.map((album) => cardTemp(album, hasUser))
        : html`<h2>There are no albums added yet.</h2>`}
    </ul>
  </section>
`;

export async function showCatalog(ctx) {
    const allAlbums = await getAllAlbums()
    ctx.render(catalogTemp(allAlbums, !!ctx.user))
}