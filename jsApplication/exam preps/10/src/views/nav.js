import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<div>
    <a href="/catalog">Dashboard</a>
</div>
${isLogged ? html`<div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
</div>`: html`<div class="guest">
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