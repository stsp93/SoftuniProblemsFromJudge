import { getUser } from "../api/auth.js"
import { getUserMemes } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = [], user) => html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${results.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        <!-- Display : All created memes by this user (If any) -->

        ${results.length > 0 ? results.map(createCard) : html`<p class="no-memes">No memes in database.</p>`}

        <!-- Display : If user doesn't have own memes  -->

    </div>
</section>`

const createCard = (meme) => html`<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`

export async function showProfile(ctx, next) {
    const user = getUser()
    const results = await getUserMemes(user._id)
    ctx.render(createTemplate(results,user))
}