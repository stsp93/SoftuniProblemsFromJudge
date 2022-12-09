import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register-page" class="register">
<form @submit=${onSubmit} id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
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
        const {email, password, 'confirm-pass': rePass} = payload;
        if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
        if(password !== rePass) throw new Error('Passwords don\'t match');

        const res =await register(email, password)

        context.page.redirect('/')

    } catch (err) {
        alert(err)
    }

}