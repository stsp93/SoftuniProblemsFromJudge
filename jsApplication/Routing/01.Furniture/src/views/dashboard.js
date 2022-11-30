import { getAll } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (data) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
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

let context;
export async function showDashboard(ctx, next) {
    const data = await getAll();
    context = ctx;
    ctx.navActive('catalogLink');
    ctx.render(createTemplate(data))
    ctx.updateNav();
}

