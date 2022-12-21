import { editOffer, getOfferDetails } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (offer) => html`<section id="edit">
<div @submit=${onSubmit} class="form">
  <h2>Edit Offer</h2>
  <form class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${offer.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${offer.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${offer.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    >
    ${offer.description}=</textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    >
    ${offer.requirements}</textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${offer.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

let context;
export async function showEdit(ctx, next) {
  context = ctx
  const details = await getOfferDetails(context.params.id)
    ctx.render(createTemplate(details))
}


async function onSubmit(ev) {
  ev.preventDefault();

  const formData = new FormData(ev.target);
  const payload = Object.fromEntries(formData);

  try {
      if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');

      const res =await editOffer(context.params.id, payload)

      context.page.redirect(`/details/${context.params.id}`)

  } catch (err) {
      alert(err)
  }

}