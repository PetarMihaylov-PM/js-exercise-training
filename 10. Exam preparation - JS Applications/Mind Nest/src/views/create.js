import { create } from "../data/data.js";
import { html } from "../lib.js";
import { showError } from "../utils/notification.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form form-item">
      <h2>Share Your Tip</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="title" id="title" placeholder="Title" />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
        <input type="text" name="type" id="type" placeholder="Type" />
        <select name="difficulty" id="difficulty">
          <option value="" disabled selected>Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <textarea id="description" name="description" placeholder="Description" rows="2" cols="50"></textarea>
        <button type="submit">Add</button>
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
    const imageUrl = formData.get('imageUrl');
    const type = formData.get('type');
    const difficulty = formData.get('difficulty');
    const description = formData.get('description');

    try {
      
      if(!title || !imageUrl || !type || !difficulty || !description){
        throw new Error('All fields are required');
      }

      await create({
        title,
        imageUrl, 
        type, 
        difficulty,
        description
      });

      ctx.page.redirect('/dashboard');
      
    } catch (error) {
      showError(error.message);
    }
  }
}