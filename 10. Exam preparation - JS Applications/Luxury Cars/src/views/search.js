import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCarsByQuery } from "../api/data.js";

const searchCarTemplate = (onSubmit, cars) => html` <section id="search">
  <div class="form">
    <h4>Search</h4>
    <form class="search-form" @submit=${onSubmit}>
      <input type="text" name="search" id="search-input"/>
      <button  class="button-list">Search</button>
    </form>
  </div>

  <div class="search-result">
    ${cars.length === 0
      ? html`<h2 class="no-avaliable">No result.</h2>`
      : cars.map(carTemplate)}
  </div>
</section>`;

const carTemplate = (car) => html` <div class="car">
  <img src=${car.imageUrl} alt="example1" />
  <h3 class="model">${car.model}</h3>
  <a class="details-btn" href=${`/details/${car._id}`}>More Info</a>
</div>`;

export async function searchPage(ctx) {
  ctx.render(searchCarTemplate(onSearch, []));

  async function onSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search");


    if (!searchValue) {
      return alert("Please fill the field!");
    }

    let cars = await getAllCarsByQuery(searchValue);

    ctx.render(searchCarTemplate(onSearch, cars));
  }
}
