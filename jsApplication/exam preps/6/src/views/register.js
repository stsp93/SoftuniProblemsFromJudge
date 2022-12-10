import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register-page" class="content auth">
<form @submit=${onSubmit} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
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
        const {email, password, 'confirm-password':rePass} = payload;
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
        if(rePass !== password) throw new Error('Passwords don\'t match');


        const res =await register(email, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}