import { getUser } from "../api/auth.js";
import { applyForOffer, deleteOffer, getAllApplications, getAllOffers, getOfferDetails, getSpecUserApp } from "../api/data.js"
import { html, nothing } from "../lib.js"

const createTemplate = (offer, appsCount, isCreator, hasApplied) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${offer.imageUrl} alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    <p>Applications: <strong id="applications">${appsCount}</strong></p>

    <!--Edit and Delete are only for creator-->
    <div id="action-buttons">
      ${isCreator ? html`<a href="/edit/${offer._id}" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : nothing}


      <!--Bonus - Only for logged-in users ( not authors )-->
      ${(!isCreator && getUser() && !hasApplied) ? html`<a @click=${onApply} href="javascript:void(0)"
        id="apply-btn">Apply</a>` : nothing}

    </div>
  </div>
</section>`

let context;
export async function showDetails(ctx, next) {
  context = ctx;
  const offerDetails = await getOfferDetails(ctx.params.id);
  let appsCount = await getAllApplications(ctx.params.id);
  let hasApplied = await getSpecUserApp(ctx.params.id, getUser()?._id);
  let isCreator = getUser()?._id === offerDetails._ownerId;
  ctx.render(createTemplate(offerDetails, appsCount, isCreator,hasApplied))
}

async function onDelete() {
  if (confirm('Are you sure?')) {
    await deleteOffer(context.params.id)
    context.page.redirect('/catalog');
  }
}

async function onApply() {
  const offerId = context.params.id
  const application = {
    offerId
  }
  try {
    await applyForOffer(application);
    context.page.redirect(`/details/${context.params.id}`)
  } catch (err) {
    alert(err)
  }

}


