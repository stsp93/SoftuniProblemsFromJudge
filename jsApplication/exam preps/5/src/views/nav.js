import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<section class="navbar-dashboard">
    <a href="/">Dashboard</a>
    ${isLogged ? html`<div id="user">
        <span>Welcome, ${isLogged.email}</span>
        <a class="button" href="/mybooks">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="/logout">Logout</a>
    </div>
</section>`: html`<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>`}
`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}