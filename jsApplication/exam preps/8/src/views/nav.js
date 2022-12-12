import { getUser } from "../api/auth.js";
import { html, render } from "../lib.js"

const createNav = (isLogged) => html`<!--Users and Guest-->
<li><a href="/">Home</a></li>
<li><a href="/catalog">Dashboard</a></li>
${isLogged ? html`<li><a href="/create">Create Postcard</a></li>
<li><a href="/logout">Logout</a></li>`:html`<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`}
<!--Only Guest-->

<!--Only Users-->
`

const nav = document.querySelector('nav ul');

export function showNav(ctx, next) {
    const user = getUser()
    render(createNav(user), nav);

    next()
}