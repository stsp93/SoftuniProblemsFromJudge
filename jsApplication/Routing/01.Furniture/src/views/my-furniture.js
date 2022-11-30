import { getAll } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (data) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(createUnit)}
</div>

`
const createUnit = (unit) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${unit.img} />
            <p>${unit.description}</p>
            <footer>
                <p>Price: <span>${unit.price} $</span></p>
            </footer>
            <div>
                <a href=${`/details/${unit._id}`} class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`

export async function showMyFurniture(ctx, next) {
    const data = await getAll();
    console.log(data);
    const userId = JSON.parse(sessionStorage.getItem('user'))._id;
    const owned = data.filter(f => f._ownerId === userId);
    ctx.navActive('profileLink');
    ctx.render(createTemplate(owned))
    ctx.updateNav()
}