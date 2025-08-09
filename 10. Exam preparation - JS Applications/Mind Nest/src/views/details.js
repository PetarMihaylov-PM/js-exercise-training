import { deleteById, getById } from "../data/data.js";
import { html, nothing } from "../lib.js";
import { showError } from "../utils/notification.js";
import { getUserData } from "../utils/utils.js";

const detailsTemp = (currentTip, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <div>
        <img id="details-img" src=${currentTip.imageUrl} />
        <p id="details-title">${currentTip.title}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-type">Type: ${currentTip.type}</p>
          <p class="details-difficulty">
            Difficulty: ${currentTip.difficulty}
          </p>
          <p id="tip-description">
            ${currentTip.description}
          </p>
        </div>

        ${isOwner ? html`
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="/edit/${currentTip._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
            </div>
          ` : nothing}
      </div>
    </div>
  </section>

`;


export async function renderDetails(ctx) {
  
  const id = ctx.params.id;

  const currentTip = await getById(id);

  const userData = await getUserData();

  const isOwner = userData && userData.id === currentTip._ownerId;

  ctx.render(detailsTemp(currentTip, isOwner, onDelete));


  async function onDelete(){

    const userChoise = confirm('Are you sure you want to delete this show?');

    try {

      if(userChoise){
        await deleteById(id);

        ctx.page.redirect('/dashboard');
      }

    } catch (error) {
      showError(error.message);
    }
  }
}