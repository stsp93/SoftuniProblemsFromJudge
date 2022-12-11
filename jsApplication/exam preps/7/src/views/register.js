import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register">
<form @submit=${onSubmit} id="register-form">
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="#">Sign in</a>.</p>
        </div>
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
        const {email, password,gender,username, repeatPass} = payload;
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
        if (password !== repeatPass) throw new Error('Passwords dont match');


        const res =await register(email, password,gender,username)

        context.page.redirect('/catalog')

    } catch (err) {
        context.renderError(err)
    }

}