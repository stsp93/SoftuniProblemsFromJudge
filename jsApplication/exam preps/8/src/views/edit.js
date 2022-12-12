import { editPet, getDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (pet) => html`<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src=${pet.image}>
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" .value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" .value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value=${pet.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx;
    const pet = await getDetails(context.params.id)
    ctx.render(createTemplate(pet))
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');


        const res = await editPet(context.params.id,payload)

        context.page.redirect(`/details/${context.params.id}`)

    } catch (err) {
        alert(err)
    }

}