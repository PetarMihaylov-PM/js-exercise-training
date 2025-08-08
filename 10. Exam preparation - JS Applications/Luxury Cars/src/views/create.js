import { html } from "../../node_modules/lit-html/lit-html.js";

import { createSubmitHandler } from "../util.js";
import { createCar } from "../api/data.js";

const createCarTemplate = (onSubmit) => html`
<section id="create">
  <div class="form form-auto">
    <h2>Share Your Car</h2>
    <form class="create-form" @submit=${onSubmit}>
      <input type="text" name="model" id="model" placeholder="Model"/>
      <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL"/>
      <input type="text" name="price" id="price" placeholder="Price in Euro"/>
      <input type="number" name="weight" id="weight" placeholder="Weight in Kg"/>
      <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh"/>
      <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

export async function createPage(ctx) {
  ctx.render(createCarTemplate(createSubmitHandler(onSubmit)));

  async function onSubmit(data, form) {
    if (Object.values(data).some(x => x === "")) {
      return alert("All fields are required!");
    }

    await createCar({
      model: data.model,
      imageUrl: data.imageUrl,
      price: data.price,
      weight: data.weight,
      speed: data.speed,
      about: data.about
    });

    form.reset();
    ctx.page.redirect("/catalog");
  }
}