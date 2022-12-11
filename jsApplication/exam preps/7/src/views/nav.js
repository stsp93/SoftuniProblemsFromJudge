import { getUser } from "../api/auth.js";
import { html,render } from "../lib.js"

const createNav = (isLogged) => html`<a href="/catalog">All Memes</a>
<!-- Logged users -->
${isLogged ? html`<div class="user">
   <a href="/create">Create Meme</a>
   <div class="profile">
       <span>Welcome, ${isLogged.email}</span>
       <a href="/profile">My Profile</a>
       <a href="/logout">Logout</a>
   </div>
</div>`: html`<div class="guest">
   <div class="profile">
       <a href="/login">Login</a>
       <a href="/register">Register</a>
   </div>
   <a class="active" href="/">Home Page</a>
</div>`}

<!-- Guest users -->
`

const nav = document.querySelector('nav');

export function showNav(ctx,next) {
    const user = getUser()
    render(createNav(user),nav);

    next()
}