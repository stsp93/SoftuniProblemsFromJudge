import { getUser } from './api/auth.js';
import { logout } from './api/user.js';
import { render, html } from './lib.js';

const nav = document.querySelector('nav');
const main = document.querySelector('main');

const createNav = (isLogged) => html`<div>
    <a href="/dashboard">Dashboard</a>
    <a href="/search">Search</a>
</div>
${isLogged ? html`<div class="user">
    <a href="/addPair">Add Pair</a>
    <a href="/logout">Logout</a>
</div>`: html`<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`}
`

export function showNav(ctx, next) {
    const isLogged = Boolean(getUser())
    render(createNav(isLogged), nav)
    next();
}

export function decorateCtx(ctx, next) {
    ctx.render = (section) => render(section, main);
    next();
}

export async function onLogout(ctx, next) {
    if (Boolean(getUser())) {
        try {
            const res = await logout();
            ctx.page.redirect('/dashboard')
        } catch (err) {
            alert(err)
        }

    }

}

