import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="registerPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Register</legend>

        <label for="email" class="vhide">Email</label>
        <input id="email" class="email" name="email" type="text" placeholder="Email">

        <label for="password" class="vhide">Password</label>
        <input id="password" class="password" name="password" type="password" placeholder="Password">

        <label for="conf-pass" class="vhide">Confirm Password:</label>
        <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

        <button type="submit" class="register">Register</button>

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </fieldset>
</form>
</section>`


let context
export function showRegister(ctx, next) {
    context = ctx;
    ctx.render(createTemplate())
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const userData = Object.fromEntries(formData);

    try{
        const {email, password, 'conf-pass':rePass} = userData;
        if(Object.values(userData).some(v => v==='')) throw new Error('fill all fields');
        if(rePass !== password) throw new Error('Passwords don\'t match');

        const res = register(email,password);

        context.page.redirect('/')
    } catch (err) {
        alert(err)
    }

}