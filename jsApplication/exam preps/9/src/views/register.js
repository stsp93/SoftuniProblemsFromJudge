import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register-page" class="auth">
<form @submit=${onSubmit} id="register">
    <h1 class="title">Register</h1>

    <article class="input-group">
        <label for="register-email">Email: </label>
        <input type="email" id="register-email" name="email">
    </article>

    <article class="input-group">
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="password">
    </article>

    <article class="input-group">
        <label for="repeat-password">Repeat Password: </label>
        <input type="password" id="repeat-password" name="repeatPassword">
    </article>

    <input type="submit" class="btn submit-btn" value="Register">
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
        if (password !== repeatPassword) throw new Error('Passwords not same');

        
        const res =await register(email, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}