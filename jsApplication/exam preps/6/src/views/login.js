import { login } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="login-page" class="auth">
<form @submit=${onSubmit} id="login">

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </div>
</form>
</section>`


let context;
export function showLogin(ctx, next) {
    ctx.render(createTemplate())
    context = ctx;
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');

        const {email, password} = payload;

        const res =await login(email, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}