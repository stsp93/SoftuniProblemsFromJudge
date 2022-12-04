import { editTheater, getById } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (res) => html`<section id="editPage">
<form @submit=${onSubmit} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" .value=${res.title}>
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${res.date}>
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
            .value=${res.author}>
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            placeholder="Description">${res.description}</textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
            .value=${res.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx;

    const res = await getById(ctx.params.id)
    ctx.render(createTemplate(res))
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');

        const res =await editTheater(context.params.id,payload)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}