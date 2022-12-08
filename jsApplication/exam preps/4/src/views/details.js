import { getUser } from "../api/auth.js"
import { deleteCar, getDetails } from "../api/data.js"
import { html,nothing } from "../lib.js"

const createTemplate = (car,isOwner) => html`<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src="${car.imageUrl}">
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>

    <p class="description-para">${car.description}</p>

    ${isOwner? html`<div class="listings-buttons">
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a @click = ${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
    </div>`: nothing}
    
</div>
</section>`


let context;
export async function showDetails(ctx, next) {
    context = ctx;
    const car = await getDetails(ctx.params.id)

    const isOwner = getUser()?._id === car._ownerId

    ctx.render(createTemplate(car,isOwner))

}

async function onDelete() {
    if(confirm('Are you sure?')) {
        const res = await deleteCar(context.params.id);
        context.page.redirect('/catalog');
    }
}