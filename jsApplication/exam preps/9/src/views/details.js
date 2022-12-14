import { getUser } from "../api/auth.js";
import { addDonation, deletePost, getDetails, getTotalDonations, getUserDonation } from "../api/data.js"
import { html, nothing } from "../lib.js"

const createTemplate = (post, isCreator, totalDonations, hasDonated, onDonate, onDelete) => html`<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${post.imageUrl}" alt=${post.title} class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">${`Donate Materials: ${totalDonations}`}</p>

                <!--Edit and Delete are only for creator-->
                <div class="btns">
                    ${isCreator ? html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>` : nothing}
                    ${(() => {
                    if (!isCreator && getUser() && !hasDonated ) {
                    return html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
                    }
                    })()}
                    <!--Bonus - Only for logged-in users ( not authors )-->

                </div>

            </div>
        </div>
    </div>
</section>`

let context;
export async function showDetails(ctx, next) {
    context = ctx;
    let post = await getDetails(context.params.id);
    let totalDonations = await getTotalDonations(context.params.id)
    let hasDonated;
    let postId = context.params.id
    if (getUser()) {
        hasDonated = await getUserDonation(context.params.id, getUser()._id)
    }
    let isCreator = getUser()?._id === post._ownerId;
    ctx.render(createTemplate(post, isCreator, totalDonations, hasDonated, onDonate, onDelete));


    async function onDelete() {
        if (confirm('Are you sure?')) {
            await deletePost(context.params.id);
            context.page.redirect('/');
        }
    }

    async function onDonate(ev) {
        ev.preventDefault();
        
            // ev.target.parentElement.parentElement.querySelector('.donate-Item').textContent = 'Donate Materials: 6'
            // ev.target.remove();
            const donation = { postId }
            await addDonation(donation);
            totalDonations = await getTotalDonations(context.params.id)
            hasDonated;
            if (getUser()) {
                hasDonated = await getUserDonation(context.params.id, getUser()._id)
            }
            isCreator = getUser()?._id === post._ownerId;
            context.render(createTemplate(post, isCreator, totalDonations, hasDonated, onDonate, onDelete));
       

    }
}



