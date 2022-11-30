import { edit, getById } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (item, editData = {}) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onEdit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${editData.make? 'is-valid': 'is-invalid'}" id="new-make" type="text" name="make" value="${item.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${editData.model? 'is-valid': 'is-invalid'}" id="new-model" type="text" name="model" value="${item.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${editData.year? 'is-valid': 'is-invalid'}" id="new-year" type="number" name="year" value="${item.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${editData.description? 'is-valid': 'is-invalid'}" id="new-description" type="text" name="description" value="${item.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${editData.price? 'is-valid': 'is-invalid'}" id="new-price" type="number" name="price" value="${item.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${editData.img? 'is-valid': 'is-invalid'}" id="new-image" type="text" name="img" value="${item.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${item.material}">
            </div>
            <input  type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`

let context;
let itemData;

export async function showEdit(ctx, next) {
    itemData = await getById(ctx.params.id)
    ctx.render(createTemplate(itemData, itemData))
    context = ctx
    ctx.navActive('createLink');
}


async function onEdit(ev) {
    ev.preventDefault()

    const formData = new FormData(ev.target)

    const editData = Object.fromEntries(formData);
    if(editData.make.length < 4) editData.make = false;
    if(editData.year < 1950 || editData.year >2050) editData.year = false;
    if(editData.description.length < 11) editData.description = false;
    if(editData.price < 1) editData.price = false;
    if(editData.img === '') editData.img = false;

    if(Object.values(editData).some(f => f === false)) {
        context.render(createTemplate(itemData, editData))
        return;
    }

    console.log(context.params.id);
    const data = await edit(context.params.id, editData);

    context.page.redirect('/index')

}