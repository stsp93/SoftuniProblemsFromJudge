import { editItem, getAlbumDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (result) => html`<section class="editPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" .value=${result.name}>

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${result.imgUrl}">

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" .value=${result.price}>

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${result.releaseDate}>

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" .value=${result.artist}>

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" .value=${result.genre}>

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"
                cols="10">${result.description}</textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>`

let context;
export async function showEdit(ctx, next) {
    context = ctx;
    const result = await getAlbumDetails(ctx.params.id)
    ctx.render(createTemplate(result))
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const newItem = Object.fromEntries(formData)

    try{
        if (Object.values(newItem).some(v => v === '')) throw new Error('Fill the empty fields');

        const res =await editItem(context.params.id,newItem)

        context.page.redirect('/details/' + context.params.id)

    }catch(err) {
        alert(err)
    }

}