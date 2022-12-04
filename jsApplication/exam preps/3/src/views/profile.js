import { getUser } from "../api/auth.js"
import { getProfile } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${getUser().email}</h2>
    </div>
    <div class="board">
        ${results.length > 0 ? results.map(createCard): html`<div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
        
    </div>
</section>`

const createCard = (card) => html`<div class="eventBoard">
    <div class="event-info">
        <img src=".${card.imageUrl}">
        <h2>${card.title}</h2>
        <h6>${card.date}</h6>
        <a href="/details/${card._id}" class="details-button">Details</a>
    </div>
</div>`


export async function showProfile(ctx, next) {
    const results = await getProfile(getUser()._id)
    ctx.render(createTemplate(results))
}