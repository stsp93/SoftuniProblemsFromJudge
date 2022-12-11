import { login } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="login">
<form @submit=${onSubmit} id="login-form">
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="#">Sign up</a>.</p>
        </div>
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

        context.page.redirect('/catalog')

    } catch (err) {
        context.renderError(err)
    }

}