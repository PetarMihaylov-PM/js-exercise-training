import { createDrone } from "../data/data.js";
import { html } from "../lib.js";
import { showError } from "../utils/notification.js";

const createTemp = (onCreate) => html`
  <section id="create">
    <div class="form form-item">
      <h2>Add Drone Offer</h2>

      <form class="create-form" @submit=${onCreate}>
        <input type="text" name="model" id="model" placeholder="Drone Model" />
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
        <input type="number" name="price" id="price" placeholder="Price" />
        <input type="number" name="weight" id="weight" placeholder="Weight" />
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
        <input type="text" name="condition" id="condition" placeholder="Condition" />
        <textarea name="description" id="description" placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>

    </div>
  </section>
`;


export function renderCreate(ctx) {
  ctx.render(createTemp(onCreate));

  async function onCreate(event) {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

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

      await createDrone({model, imageUrl, price, condition, weight, phone, description});

      ctx.page.redirect('/catalog');

    } catch (err) {
      showError(err.message);
    }
  }
}