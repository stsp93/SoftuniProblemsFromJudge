import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<a href="/">Dashboard</a>
${isLogged ? html`<div id="user">
    <a href="/myPosts">My Posts</a>
    <a href="/create">Create Post</a>
    <a href="/logout">Logout</a>
</div>`: html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}
<!-- Logged-in users -->


<!-- Guest users -->
`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}