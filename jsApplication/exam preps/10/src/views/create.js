import { createOffer } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="create">
<div @submit=${onSubmit} class="form">
  <h2>Create Offer</h2>
  <form class="create-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
    />

    <button type="submit">post</button>
  </form>
</div>
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

      const res =await createOffer(payload);

      context.page.redirect('/catalog')

  } catch (err) {
      alert(err)
  }

}