import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<a href="/">Theater</a>
<ul>
    ${isLogged ? html`<li><a href="/profile">Profile</a></li>
    <li><a href="/create">Create Event</a></li>
    <li><a href="/logout">Logout</a></li>`: html` <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`}
    <!--Only users-->

    <!--Only guest-->

</ul>`

const nav = document.querySelector('nav');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}