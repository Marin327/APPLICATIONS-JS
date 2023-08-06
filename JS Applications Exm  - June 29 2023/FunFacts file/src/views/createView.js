import { createFacts } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemp = (handler) => html`<section id="create">
<div class="form">
  <h2>Add Fact</h2>
  <form @submit=${handler} class="create-form">
    <input
    type="text"
        name="category"
        id="category"
        placeholder="Category"
    />
    <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
    />
    <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
  ></textarea>
  <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
  ></textarea>
    <button type="submit">Add Fact</button>
  </form>
</div>
</section>`
;

export async function showCreate(ctx) {
    ctx.render(createTemp(createSubmitHandler(onCreate)));

    async function onCreate(data) {
      
        const {
            category,
            ['image-url']:imageUrl,
            description, 
            ['additional-info']:moreInfo
          }  = data;
          // ако нямам разминавания в променливите от условието на задачата и от хтмл-а пиша си направо само category, imageUrl....
        if(!category || !imageUrl || !description || !moreInfo) {
            return alert('All fields are required!');
        };
        // тук също ако нямам разминавания в променливите си пише await createFacts(data)
           await createFacts({
            category,
            imageUrl: data['image-url'],
            description,
            moreInfo: data['additional-info']
           });

            ctx.page.redirect('/catalog');
    }
}