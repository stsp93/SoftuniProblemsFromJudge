import { register } from '../api/user.js';
import { html } from '../lib.js';

const createTemplate = () => html`<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onSubmit} class="login-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input type="password" name="password" id="register-password" placeholder="password" />
      <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
      <button type="submit">login</button>
      <p class="message">Already registered? <a href="#">Login</a></p>
    </form>
  </div>
</section>`

let context;

export function showRegister(ctx, next) {
  ctx.render(createTemplate());
  context = ctx;
}

async function onSubmit(ev) {
  ev.preventDefault()
  const formData = new FormData(ev.target);

  const { email, password, 're-password': rePassword } = Object.fromEntries(formData);

  try {
    if (password !== rePassword) throw new Error('Passwords dont match');
    if (email === '' || password === '') throw new Error('Please fill the fields');
    const res = await register(email, password);

    context.page.redirect('/dashboard')
  } catch (err) {
    alert(err)
  }
}