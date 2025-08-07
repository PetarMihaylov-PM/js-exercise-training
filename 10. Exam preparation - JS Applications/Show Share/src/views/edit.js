import { getById, update } from "../data/data.js";
import { html } from "../lib.js";

const editTemp = (onSubmit, currentShow) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Show</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="TV Show title"
          @value=${currentShow.title}
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
          @value=${currentShow.imageUrl}
        />
        <input
        type="text"
        name="genre"
        id="genre"
        placeholder="Genre"
        @value=${currentShow.genre}
      />
      <input
      type="text"
      name="country"
      id="country"
      placeholder="Country"
      @value=${currentShow.country}
    />
        <textarea
          id="details"
          name="details"
          placeholder="Details"
          rows="2"
          cols="10"
        >${currentShow.details}</textarea>
        <button type="submit">Edit Show</button>
      </form>
    </div>
  </section>
`;

export async function renderEdit(ctx){
  ctx.render(editTemp(onSubmit, currentShow));

  const id = ctx.params.id;

  const currentShow = await getById(id);

  async function onSubmit(e) {
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

      await update(id, {
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
};