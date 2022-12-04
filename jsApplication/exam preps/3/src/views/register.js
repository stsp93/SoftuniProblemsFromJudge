import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="registerPage">
<form @submit=${onSubmit} class="registerForm">
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="#">here</a></span>
    </p>
</form>
</section>`

let context;
export function showRegister(ctx, next) {
    context = ctx;
    ctx.render(createTemplate())
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        const {email, password,repeatPassword} = payload;
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
        if (password !== repeatPassword) throw new Error('Passwords don\'t match');


        const res =await register(email, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}