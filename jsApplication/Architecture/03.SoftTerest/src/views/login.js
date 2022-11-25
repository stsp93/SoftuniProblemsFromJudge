import { login } from "../api/user.js";

const section = document.getElementById('login');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx;

export function showLogin(context) {
    context.showSection(section)
    ctx = context;
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email =formData.get('email');
    const password =formData.get('password');

    const res = await login(email, password)
    form.reset();

    ctx.goTo('/')
}