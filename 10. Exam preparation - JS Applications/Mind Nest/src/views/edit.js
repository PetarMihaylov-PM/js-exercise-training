import { getById, update } from "../data/data.js";
import { html } from "../lib.js";
import { showError } from "../utils/notification.js";

const editTemp = (onSubmit, currentTip) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Your Item</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input type="text" name="title" id="title" placeholder="Title" .value=${currentTip.title}/>
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${currentTip.imageUrl}/>
        <input type="text" name="type" id="type" placeholder="Type" .value=${currentTip.type}/>
        <select name="difficulty" id="difficulty">
          <option value="" disabled selected>Select difficulty</option>
          <option value="Easy" ?selected=${currentTip.difficulty === 'Easy'}>Easy</option>
          <option value="Medium" ?selected=${currentTip.difficulty === 'Medium'}>Medium</option>
          <option value="Hard" ?selected=${currentTip.difficulty === 'Hard'}>Hard</option>
        </select>
        <textarea id="description" name="description" placeholder="Description" rows="2" cols="50">${currentTip.description}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function renderEdit(ctx){

  const id = ctx.params.id;

  const currentTip = await getById(id);

  ctx.render(editTemp(onSubmit, currentTip));

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

      await update(id, {
        title,
        imageUrl, 
        type, 
        difficulty,
        description
      });

      ctx.page.redirect(`/dashboard/${id}`);
      
    } catch (error) {
      showError(error.message);
    }
  }
};