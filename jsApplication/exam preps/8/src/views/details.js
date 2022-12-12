import { getUser } from "../api/auth.js";
import { addDonation, deletePet, getDetails, getDonationCount, getUserSpecDonation } from "../api/data.js"
import { html, nothing } from "../lib.js"

const createTemplate = (pet, isOwner,donations,isDonated) => html`<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donations*100}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${getUser() ? html`<div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                ${isOwner ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click=${onDelete}  href="javascript:void(0)" class="remove">Delete</a>`: nothing}
                ${!isOwner && !isDonated? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`:nothing}
                <!--(Bonus Part) Only for no creator and user-->
                
            </div>`:nothing}

        </div>
    </div>
</section>`

let context;
export async function showDetails(ctx, next) {
    context = ctx;
    const pet = await getDetails(context.params.id);
    const isOwner = getUser()?._id === pet._ownerId;
    const donations = await getDonationCount(context.params.id);
    const isDonated = await getUserSpecDonation(context.params.id,getUser()?._id)
    ctx.render(createTemplate(pet, isOwner,donations,isDonated))
}

async function onDelete() {
    if(confirm('Are you sure?')) {
        await deletePet(context.params.id);
        context.page.redirect('/');
    }
}

async function onDonate() {
    try {
        const res = await addDonation({petId:context.params.id});
       context.page.redirect(`/details/${context.params.id}`)
    } catch (err) {
        alert(err);
    }

}