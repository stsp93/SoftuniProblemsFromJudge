import { editCar, getDetails } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (car) => html`<section id="edit-listing">
<div class="container">

    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx
    const car = await getDetails(ctx.params.id)
    ctx.render(createTemplate(car))
}


async function onSubmit(ev) {
ev.preventDefault();

const formData = new FormData(ev.target);
const newCar = Object.fromEntries(formData);
newCar.year = +newCar.year
newCar.price = +newCar.price
try {
if(Object.values(newCar).some(v => v==='')) throw new Error('Please fill all fields');

const res = await editCar(context.params.id, newCar);
context.page.redirect(`/details/${context.params.id}`)
}catch(err) {
    alert(err)
}

}
