import { deleteItem, getById } from "../api/data.js";
import { html, nothing } from "../lib.js"

const createTemplate = (unit) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="../.${unit.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${unit.make}</span></p>
        <p>Model: <span>${unit.model}</span></p>
        <p>Year: <span>${unit.year}</span></p>
        <p>Description: <span>${unit.description}</span></p>
        <p>Price: <span>${unit.price}</span></p>
        <p>Material: <span>${unit.material}</span></p>
        ${isOwned ? createBtns(unit._id) : nothing}
    </div>
</div>`

const createBtns = (id) => html`<div>
    <a href="/edit/${id}" class="btn btn-info">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
</div>`

let isOwned;
let context;
export async function showDetails(ctx, next) {
    context = ctx;
    const data = await getById(ctx.params.id)
    const ownerId = data._ownerId;
    const userId = JSON.parse(sessionStorage.getItem('user'))?._id;
    isOwned = ownerId === userId ? true : false;

    ctx.render(createTemplate(data))
}

async function onDelete(id) {
        const data = await deleteItem(context.params.id);
        context.page.redirect('/index');
    
}