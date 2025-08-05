import { getAllDrones } from "../data/data.js";
import { html } from "../lib.js"

const catalogTemp = (drones) => html`
  <h3 class="heading">Marketplace</h3>
  <section id="dashboard">
    
    ${drones.length 
      ? drones.map(droneCard) 
      : html`
      <h3 class="no-drones">No Drones Available</h3>
      `}
    
  </section>
  
`;


const droneCard = (drone) => html`
 <div class="drone">
    <img src=${drone.imageUrl} />
    <h3 class="model">${drone.model}</h3>
    <div class="drone-info">
      <p class="price">Price: €${drone.price}</p>
      <p class="condition">Condition: ${drone.condition}</p>
      <p class="weight">Weight: ${drone.weight}g</p>
    </div>
    <a class="details-btn" href="/catalog/${drone._id}">Details</a>
  </div>
`

export async function renderCatalog(ctx) {
  const drones = await getAllDrones();
  
  ctx.render(catalogTemp(drones)); 
}