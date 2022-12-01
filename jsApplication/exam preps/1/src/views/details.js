import { getUser } from '../api/auth.js';
import { deleteItem, getDetails } from '../api/data.js';
import { html, nothing} from '../lib.js';

const createTemplate = (item, isOwner) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src="..${item.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${item.brand}</span></p>
      <p>
        Model: <span id="details-model">${item.model}</span>
      </p>
      <p>Release date: <span id="details-release">${item.release}</span></p>
      <p>Designer: <span id="details-designer">${item.designer}</span></p>
      <p>Value: <span id="details-value">${item.value}</span></p>
    </div>

    <!--Edit and Delete are only for creator-->
    ${isOwner? createBtns(item._id) : nothing}
    
  </div>
</section>`

const createBtns = (id) => html`<div id="action-buttons">
<a href="/edit/${id}" id="edit-btn">Edit</a>
<a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
</div>`

let context;
export async function showDetails(ctx, next) {
  context =ctx;
  const res = await getDetails(ctx.params.id);
  const isOwner = getUser()._id === res._ownerId;


  ctx.render(createTemplate(res, isOwner));
}

async function onDelete() {
  if(confirm('Are you sure?')) {
    try {
      const res = await deleteItem(context.params.id)
      console.log(res);
    } catch(err) {
      alert(err);
    }
  }
}