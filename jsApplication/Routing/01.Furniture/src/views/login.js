import { login } from "../api/user.js"
import { html } from "../lib.js"

const createTemplate = () => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Login User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onLogin} >
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
        <input type="submit" class="btn btn-primary" value="Login" />
    </div>
</div>
</form>`

let context;
export function showLogin(ctx,next) {
    context = ctx;
    ctx.navActive('loginLink')
    ctx.render(createTemplate());
}

async function onLogin(ev) {
    ev.preventDefault()
    const formData = new FormData(this)
    const {email, password,rePass} = Object.fromEntries(formData);
    
    
    const res = await login(email, password);
    const user = JSON.stringify(res)
    sessionStorage.setItem('user', user)
    
    this.reset()
    
    context.updateNav()
    context.page.redirect('/index')
}