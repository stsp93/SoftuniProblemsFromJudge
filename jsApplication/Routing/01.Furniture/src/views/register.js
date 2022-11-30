import { register } from "../api/user.js"
import { html } from "../lib.js"

const createTemplate = () => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onRegister} >
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`

let context;
export function showRegister(ctx,next) {
    context = ctx;
    ctx.navActive('registerLink');
    ctx.render(createTemplate());
}


async function onRegister(ev) {
    ev.preventDefault()
    const formData = new FormData(this)
    const {email, password,rePass} = Object.fromEntries(formData);

    if(password !== rePass) {
        return alert('Passwords don\'t match');
    }

    const user = await register(email, password);
    sessionStorage.setItem('user',JSON.stringify(user))
    this.reset()

    context.updateNav()
    context.page.redirect('/index')
}
