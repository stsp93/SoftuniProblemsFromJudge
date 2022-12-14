import { getAllPosts } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="dashboard-page">
<h1 class="title">All Posts</h1>

<!-- Display a div with information about every post (if any)-->
${results.length > 0? html`<div class="all-posts">
    ${results.map(createCard)}
</div>`:html`<h1 class="title no-posts-title">No posts yet!</h1>`}


<!-- Display an h1 if there are no posts -->

</section>`

const createCard = (post) => html`<div class="post">
<h2 class="post-title">${post.title}</h2>
<img class="post-image" src=".${post.imageUrl}" alt="${post.title}">
<div class="btn-wrapper">
    <a href="/details/${post._id}" class="details-btn btn">Details</a>
</div>
</div>`

export async function showHome(ctx, next) {
    const results = await getAllPosts()
    ctx.render(createTemplate(results))
}