import { updateDrone } from "../data/data.js";
import { html } from "../lib.js";

const editTemp = (onEdit) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${onEdit}>
        <input type="text" name="model" id="model" placeholder="Drone Model" />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
        <input type="number" name="price" id="price" placeholder="Price" />
        <input type="number" name="weight" id="weight" placeholder="Weight" />
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
        <input type="text" name="condition" id="condition" placeholder="Condition" />
        <textarea name="description" id="description" placeholder="Description"></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;


export function renderEdit(ctx) {
  
  ctx.render(editTemp(onEdit));

  async function onEdit(event) {
    event.preventDefault();

    const id = ctx.params.id;

    const fromData = new FormData(event.currentTarget);
    const data = Object.fromEntries(fromData.entries());

    const { 
      model, 
      imageUrl, 
      price, 
      weight,
      phone,
      condition, 
      description,
    } = data;


    try{
      if(!model || !imageUrl || !price || !weight || !description || !condition || !phone) {
        throw new Error('All fields are required!');
      }

      await updateDrone(id, {model, imageUrl, price, weight, phone, condition, description})

      ctx.page.redirect(`/catalog/${id}`);

    } catch (err) {
      alert(err.message);
    }

    
  }
}