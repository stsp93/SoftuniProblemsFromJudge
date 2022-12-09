import { editBook, getDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (result) => html`<section id="edit-page" class="edit">
<form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" .value=${result.title}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description">${result.description}</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value=${result.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" .value=${result.type}>
                    <option .value="Fiction" selected>Fiction</option>
                    <option .value="Romance">Romance</option>
                    <option .value="Mistery">Mistery</option>
                    <option .value="Classic">Clasic</option>
                    <option .value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" .value="Save">
    </fieldset>
</form>
</section>`

let context;

export async function showEdit(ctx, next) {
    const result = await getDetails(ctx.params.id)
    context = ctx;
    ctx.render(createTemplate(result))
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');


        const res =await editBook(context.params.id,payload)

        context.page.redirect(`/details/${context.params.id}`)

    } catch (err) {
        alert(err)
    }

}