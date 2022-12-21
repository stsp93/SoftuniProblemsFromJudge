import { login } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="login">
<div @submit=${onSubmit} class="form">
  <h2>Login</h2>
  <form class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
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
        alert(err)
    }

}