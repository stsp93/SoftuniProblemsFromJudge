import { createCar } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

let context;
export function showCreate(ctx, next) {
    ctx.render(createTemplate())
    context = ctx;
}


async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const newCar = Object.fromEntries(formData);

    try {
        if (Object.values(newCar).some(v => v === '')) throw new Error('Please fill all fields');
        newCar.year = +newCar.year
        newCar.price = +newCar.price
        const res = await createCar(newCar);
        context.page.redirect(`/catalog`)
    } catch (err) {
        alert(err)
    }

}