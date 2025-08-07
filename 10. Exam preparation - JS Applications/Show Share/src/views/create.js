import { create } from "../data/data.js";
import { html } from "../lib.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Add Show</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input
        type="text"
        name="title"
        id="title"
        placeholder="TV Show title"
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <input
      type="text"
      name="genre"
      id="genre"
      placeholder="Genre"
    />
    <input
    type="text"
    name="country"
    id="country"
    placeholder="Country"
  />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
      ></textarea>
        <button type="submit">Add Show</button>
      </form>
    </div>
  </section>
`;

export function renderCreate(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title');
    const imageUrl = formData.get('image-url');
    const genre = formData.get('genre');
    const country = formData.get('country');
    const details = formData.get('details');

    try {
      
      if(!title || !imageUrl || !genre || !country || !details){
        throw new Error('All fields are required');
      }

      await create({
        title,
        imageUrl, 
        genre, 
        country,
        details
      });

      ctx.page.redirect('/dashboard');
      
    } catch (error) {
      alert(error.message);
    }
  }
}