import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (user) => html`<a class="active" href="/">Home</a>
<a href="/catalog">All Listings</a>
<a href="/search">By Year</a>
${user ? html`<div id="profile">
    <a>Welcome ${user.username}</a>
    <a href="/my-listings">My Listings</a>
    <a href="/create">Create Listing</a>
    <a href="/logout">Logout</a>
</div>`: html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    const links = Array.from(nav.querySelectorAll('a'))
    links.forEach(el => el.classList.remove('active'));
    const link = links.find(l => l.pathname === ctx.pathname);

    if(link) {
        link.classList.add('active')
    }


    next()
}