import { getDroneById, updateDrone } from "../data/data.js";
import { html } from "../lib.js";

const editTemp = (droneData, onEdit) => html`
  <section id="edit">
    <div class="form form-item">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${onEdit}>
        <input type="text" name="model" id="model" placeholder="Drone Model" .value=${droneData.model} />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${droneData.imageUrl} />
        <input type="number" name="price" id="price" placeholder="Price" .value=${droneData.price} />
        <input type="number" name="weight" id="weight" placeholder="Weight" .value=${droneData.weight} />
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value=${droneData.phone} />
        <input type="text" name="condition" id="condition" placeholder="Condition" .value=${droneData.condition} />
        <textarea name="description" id="description" placeholder="Description">${droneData.description}</textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;


export async function renderEdit(ctx) {
  const id = ctx.params.id;

  const droneData = await getDroneById(id);
  
  ctx.render(editTemp(droneData, onEdit));

  async function onEdit(event) {
    event.preventDefault();
    
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

      await updateDrone(droneData._id, {model, imageUrl, price, weight, phone, condition, description})

      ctx.page.redirect(`/catalog/${id}`);

    } catch (err) {
      alert(err.message);
    }

    
  }
}