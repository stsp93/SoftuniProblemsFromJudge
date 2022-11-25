import { register } from "../api/user.js";

const section = document.getElementById('register');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx;

export function showRegister(context) {
    context.showSection(section)
    ctx = context;
}



async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const email =formData.get('email');
    const password =formData.get('password');
    const repeatPassword =formData.get('repeatPassword');

    if(password !== repeatPassword) {
        alert('Passwords don\'t match');
        return;
    }

    const res = await register(email, password)
    form.reset();

    ctx.goTo('/')
}