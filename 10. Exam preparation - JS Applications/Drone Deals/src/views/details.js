import { getDroneById } from "../data/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const detailTemp = (drone, isOwner) => html`
  <section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src="${drone.imageUrl}" alt="example1" />
        <p id="details-model">${drone.model}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: €${drone.price}</p>
          <p class="details-condition">Condition: ${drone.condition}</p>
          <p class="details-weight">Weight: ${drone.weight}g</p>
          <p class="drone-description">
            ${drone.description}
          </p>
          <p class="phone-number">Phone: ${drone.phone}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${ isOwner ? html `<div class="buttons">
          <a href="" id="edit-btn">Edit</a>
          <a href="" id="delete-btn">Delete</a>
        </div>` : html``}
      </div>
    </div>
  </section>
`;

export async function renderDetails(ctx) {

  const id = ctx.params.id;
  
  const userData = getUserData();

  const drone = await getDroneById(id);

  const isOwner = userData && drone._id === userData.id;

  ctx.render(detailTemp(drone, isOwner));
}