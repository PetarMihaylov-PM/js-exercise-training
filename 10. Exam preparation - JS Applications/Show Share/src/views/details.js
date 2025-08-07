import { getById } from "../data/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const detailsTemp = (currentShow, isOwner) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${currentShow.imageUrl} />
      <div id="details-text">
        <p id="details-title">${currentShow.title}</p>
        <div id="info-wrapper">
          <div id="description">
            <p id="details-description">
              ${currentShow.details}
            </p>
          </div>
        </div>
    

        <!--Edit and Delete are only for creator-->
        ${isOwner ? html`<div id="action-buttons">
          <a href="/edit/${currentShow._id}" id="edit-btn">Edit</a>
          <a href="/delete/${currentShow._id}" id="delete-btn">Delete</a>
        </div>` : nothing}
      </div>
    </div>
  </section>
`;


export async function renderDetails(ctx) {
  
  const id = ctx.params.id;

  const currentShow = await getById(id);

  const userData = await getUserData();

  const isOwner = true;//userData && userData.id === currentShow._id;

  ctx.render(detailsTemp(currentShow, isOwner));


}