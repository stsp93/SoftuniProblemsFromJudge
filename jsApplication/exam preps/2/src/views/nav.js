import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<img src="../images/headphones.png">
<a href="/">Home</a>
<ul>

    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    ${isLogged? html`<li><a href="/create">Create Album</a></li>
    <li><a href="/logout">Logout</a></li>`: html`<li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`}
    
</ul>`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}