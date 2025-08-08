import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { getCarById, editCar } from "../api/data.js";

const editCarTemplate = (onSubmit, car) => html`<section id="edit">
<div class="form form-auto">
  <h2>Edit Your Car</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input type="text" name="model" id="model" .value=${car.model} placeholder="Model" />
    <input type="text" name="imageUrl" id="car-image" .value=${car.imageUrl} placeholder="Your Car Image URL"/>
    <input type="text" name="price" id="price" .value=${car.price} placeholder="Price in Euro" />
    <input type="number" name="weight" id="weight" .value=${car.weight} placeholder="Weight in Kg" />
    <input type="text" name="speed" id="speed" .value=${car.speed} placeholder="Top Speed in Kmh" />
    <textarea id="about" name="about" .value=${car.about} placeholder="More About The Car" rows="10" cols="50" ></textarea>
    <button type="submit">Edit</button>
  </form>
</div>
</section>`;

export async function editPage(ctx) {
  const carId = ctx.params.id;
  const car = await getCarById(carId);
  ctx.render(editCarTemplate(createSubmitHandler(onSubmit), car));

  async function onSubmit(data, form) {
    if (Object.values(data).some(x => x === "")) {
      return alert("All fields are required!");
    }

    await editCar(carId, {
      model: data.model,
      imageUrl: data.imageUrl,
      price: data.price,
      weight: data.weight,
      speed: data.speed,
      about: data.about
    });

    form.reset();
    ctx.page.redirect(`/details/${ctx.params.id}`);
  }
}