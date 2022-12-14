import { getUser } from "../api/auth.js"
import { getMyPosts } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (myPosts = []) => html`<section id="my-posts-page">
<h1 class="title">My Posts</h1>

<!-- Display a div with information about every post (if any)-->
${myPosts.length > 0 ? html`<div class="my-posts">
    ${myPosts.map(createCard)}
</div>`: html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}


<!-- Display an h1 if there are no posts -->

</section>`

const createCard = (post) => html`<div class="post">
<h2 class="post-title">${post.title}</h2>
<img class="post-image" src=".${post.imageUrl}" alt="${post.title}">
<div class="btn-wrapper">
    <a href="/details/${post._id}" class="details-btn btn">Details</a>
</div>
</div>`


export async function showMyPosts(ctx, next) {
    const myPosts = await getMyPosts(getUser()._id)
    ctx.render(createTemplate(myPosts))
}