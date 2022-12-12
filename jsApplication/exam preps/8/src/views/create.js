import { create } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="createPage">
<form @submit=${onSubmit} class="createForm">
    <img src="./images/cat-create.jpg">
    <div>
        <h2>Create PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" placeholder="Max">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" placeholder="2 years">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" placeholder="5kg">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
        </div>
        <button class="btn" type="submit">Create Pet</button>
    </div>
</form>
</section>`

let context;
export function showCreate(ctx, next) {
    context = ctx;
    ctx.render(createTemplate())
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');


        const res =await create(payload)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}