import { editMeme, getDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (meme) => html`<section id="edit-meme">
<form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" >
                ${meme.description} 
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx;
    try {
        const details = await getDetails(context.params.id)
    ctx.render(createTemplate(details))
    } catch (err) {
        context.renderError(err);
    }
    
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');

        const res =await editMeme(context.params.id,payload)

        context.page.redirect(`/details/${context.params.id}`)

    } catch (err) {
        context.renderError(err)
    }

}