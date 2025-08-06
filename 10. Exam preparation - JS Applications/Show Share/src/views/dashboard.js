import { getAll } from "../data/data.js";
import { html, nothing } from "../lib.js";

const dashboardTemp = (data) => html`
  <h2>Users Recommendations</h2>
  <section id="shows">
    <!-- Display a div with information about every post (if any)-->
    
    ${data.length > 0 ? data.map(show => html`
        <div class="show">
          <img src=${show.imageUrl} />
          <div class="show-info">
            <h3 class="title">${show.title}</h3>
            <p class="genre">Genre: ${show.genre}</p>
            <p class="country-of-origin">Country of Origin: ${show.country}</p>
            <a class="details-btn" href="/dashboard/${show._id}">Details</a>
          </div>
        </div>
      `) : nothing}
  </section>
`;

 export async function renderDashboard(ctx) {


  const data = await getAll();

  ctx.render(dashboardTemp(data));
}

