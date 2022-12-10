import { getUser } from "../api/auth.js";
import { editGame, getDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (result) => html`<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${result.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${result.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${result.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${result.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${result.summary}</textarea>
            <input class="btn submit" type="submit" .value="Edit Game">

        </div>
    </form>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx;
    const result = await getDetails(ctx.params.id)
    ctx.render(createTemplate(result))
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');


        const res = await editGame(context.params.id,payload)

        context.page.redirect(`/details/${context.params.id}`)

    } catch (err) {
        alert(err)
    }

}