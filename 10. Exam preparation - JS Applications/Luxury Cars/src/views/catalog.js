import { html } from "../../node_modules/lit-html/lit-html.js";

import { getAllCars } from "../api/data.js";

const catalogTemplate = (cars) => html`
<h3 class="heading">Our Cars</h3>
<section id="dashboard">
  ${cars.length === 0 
    ? html`<h3 class="nothing">Nothing to see yet</h3>`
    : cars.map(carTemplate)}

</section>`;

const carTemplate = (car) => html` <div class="car">
<img src=${car.imageUrl} alt="example1" />
<h3 class="model">${car.model}</h3>
<div class="specs">
  <p class="price">Price: ${car.price}</p>
  <p class="weight">Weight: ${car.weight}</p>
  <p class="top-speed">Top Speed: ${car.speed}</p>
</div>
<a class="details-btn" href=${`/details/${car._id}`}>More Info</a>
</div>`


export async function catalogPage(ctx) {
  const cars = await getAllCars();

  ctx.render(catalogTemplate(cars));
}