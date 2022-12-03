import { login } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="loginPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Login</legend>

        <label for="email" class="vhide">Email</label>
        <input id="email" class="email" name="email" type="text" placeholder="Email">

        <label for="password" class="vhide">Password</label>
        <input id="password" class="password" name="password" type="password" placeholder="Password">

        <button type="submit" class="login">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
    </fieldset>
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

