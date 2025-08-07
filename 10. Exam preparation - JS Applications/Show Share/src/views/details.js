import { deleteById, getById } from "../data/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const detailsTemp = (currentShow, isOwner, onDelete) => html`
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
          <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>` : nothing}
      </div>
    </div>
  </section>
`;


export async function renderDetails(ctx) {
  
  const id = ctx.params.id;

  const currentShow = await getById(id);

  const userData = await getUserData();

  const isOwner = userData && userData.id === currentShow._ownerId;

  ctx.render(detailsTemp(currentShow, isOwner, onDelete));


  async function onDelete(){

    const userChoise = confirm('Are you sure you want to delete this show?');

    try {

      if(userChoise){
        await deleteById(id);

        ctx.page.redirect('/dashboard');
      }

    } catch (error) {
      alert(error.message);
    }
  }
}