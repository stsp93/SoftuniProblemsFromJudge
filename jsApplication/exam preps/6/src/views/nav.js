import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<a href="/catalog">All games</a>
<!-- Logged-in users -->
${isLogged ? html`<div id="user">
    <a href="/create">Create Game</a>
    <a href="/logout">Logout</a>
</div>`: html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}

<!-- Guest users -->
`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}