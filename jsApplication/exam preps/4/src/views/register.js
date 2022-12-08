import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register">
<div class="container">
    <form @submit=${onSubmit} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required>

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required>

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required>
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="/login">Sign in</a>.
        </p>
    </div>
</div>
</section>`


let context;
export function showRegister(ctx, next) {
    ctx.render(createTemplate())
    context = ctx;
}

async function onSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const payload = Object.fromEntries(formData);

    try {
        const {username, password,repeatPass} = payload;
        console.log(payload);
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
        if(password !== repeatPass) throw new Error('Passwords don\'t match');


        const res =await register(username, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}