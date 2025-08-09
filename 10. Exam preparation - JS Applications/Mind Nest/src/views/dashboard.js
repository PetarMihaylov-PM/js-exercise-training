import { getAll } from "../data/data.js";
import { html } from "../lib.js";

const dashboardTemp = (data) => html`
  
  <h3 class="heading">Mindful Tips</h3>
  <section id="tips-dashboard">

    <!-- Display a div with information about every post (if any)-->

    ${data.length > 0 ? data.map(tip => html`
        <div class="tip">
          <img src=${tip.imageUrl} alt="example1" />
          <h3 class="title">${tip.title}</h3>
          <div class="tip-info">
            <p class="type">Type: ${tip.type}</p>
            <p class="difficulty">Difficulty: ${tip.difficulty}</p>
          </div>
          <a class="details-btn" href="/dashboard/${tip._id}">View Tip</a>
        </div>
      `) 
      : 
      html`
        <h3 class="empty">No Mindful Tips Added Yet.</h3>
      `
    }
  </section>
`;

 export async function renderDashboard(ctx) {


  const data = await getAll();

  ctx.render(dashboardTemp(data));
}

