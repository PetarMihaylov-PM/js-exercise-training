import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarById, deleteCar } from "../api/data.js";

const detailsCarTemplate = (car, isOwner, onDelete) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${car.imageUrl} alt="example1" />
  <p id="details-title">${car.model}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p class="price">Price: ${car.price}</p>
      <p class="weight">Weight: ${car.weight}</p>
      <p class="top-speed">Top Speed: ${car.speed}</p>
      <p id="car-description">${car.about}</p>
    </div>
    
    ${isOwner ? html` <div id="action-buttons">
      <a href=${`/edit/${car._id}`} id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>` : null}
   
  </div>
</div>
</section>`;

export async function detailsPage(ctx) {
  const carId = ctx.params.id;
  const car = await getCarById(carId);
  const isOwner = ctx.userData?.id === car._ownerId;
  ctx.render(detailsCarTemplate(car, isOwner, onDelete));

  async function onDelete() {
    const confirmChoice = confirm(`Are you sure you want to delete this ${car.model}?`);
    if(confirmChoice) {
      await deleteCar(carId);
      ctx.page.redirect("/catalog");
    }
  }
}