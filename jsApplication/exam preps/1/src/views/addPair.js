import { addNewItem } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = () => html`<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onSubmit} class="create-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
      <input type="text" name="release" id="shoe-release" placeholder="Release date" />
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`

let context;

export function showAddPair(ctx, next) {
  context = ctx;
  ctx.render(createTemplate());

}

async function onSubmit(ev) {
  ev.preventDefault();

  const formData = new FormData(ev.target);
  const newItem = Object.fromEntries(formData);
  try {
    if(Object.values(newItem).some(v => v=== '')) {
      throw new Error('Please fill all fields')
    }

    const res = await addNewItem(newItem);


    context.page.redirect('/dashboard')
  } catch (err) {
    alert(err)
  }
}

