import { editItem,getDetails } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (item) => html`<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${item.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${item.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${item.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${item.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      .value=${item.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      .value=${item.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

let context;

export async function showEdit(ctx, next) {
  const res = await getDetails(ctx.params.id);
  console.log(res);
    ctx.render(createTemplate(res));
    context = ctx;
}


async function onSubmit(ev) {
  ev.preventDefault();


  const formData = new FormData(ev.target);
  const newItem = Object.fromEntries(formData);
  try {
    if(Object.values(newItem).some(v => v=== '')) {
      throw new Error('Please fill all fields')
    }

    const res = await editItem(context.params.id,newItem);


    context.page.redirect('/dashboard')
  } catch (err) {
    alert(err)
  }
}