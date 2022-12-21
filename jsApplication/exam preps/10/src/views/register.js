import { register } from "../api/user.js";
import { html } from "../lib.js"

const createTemplate = () => html`<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="login-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input type="password" name="password" id="register-password" placeholder="password" />
      <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="#">Login</a></p>
    </form>
  </div>
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
    const { email, password,'re-password':rePass } = payload;
    if (Object.values(payload).some(v => v === '')) throw new Error('Fill the empty fields');
    if (rePass !== password) throw new Error('Passwords don\'t match');


    const res = await register(email, password)

    context.page.redirect('/catalog')

  } catch (err) {
    alert(err)
  }

}