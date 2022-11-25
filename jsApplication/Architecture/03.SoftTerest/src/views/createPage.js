import { createIdea } from "../api/data.js";

const section = document.getElementById('createPage');

let ctx;

export function showCreate(context) {
    context.showSection(section)
    ctx = context;
}

const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)


async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const title =formData.get('title');
    const description =formData.get('description');
    const img =formData.get('imageURL');
    await createIdea({title, description, img})
    form.reset();

    ctx.goTo('/dashboard')
}