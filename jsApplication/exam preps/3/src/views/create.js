import { createTheater } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="createPage">
<form @submit=${onSubmit} class="create-form">
    <h1>Create Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value="">
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year">
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author">
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description" placeholder="Description"></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
    </div>
    <button class="btn" type="submit">Submit</button>
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

        const res =await createTheater(payload)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}