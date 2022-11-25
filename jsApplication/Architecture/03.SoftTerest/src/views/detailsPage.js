import { deleteIdea, getById } from "../api/data.js";

const section = document.getElementById('detailsPage');

let ctx;

export async function showDetails(context, id) {
    context.showSection(section)
    ctx = context;

    const idea = await getById(id);

    section.innerHTML = ideaMarkup(idea)
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user && idea._ownerId === user._id) {
        section.innerHTML += `<div class="text-center">
        <a id="del" class="btn detb" href="">Delete</a>
      </div>`
      section.querySelector('#del').addEventListener('click',async function() {
        await deleteIdea(id)
      })
    }

}

function ideaMarkup(idea) {
    return `<img class="det-img" src="${idea.img}" />
    <div class="desc">
      <h2 class="display-5">${idea.title}</h2>
      <p class="infoType">Description:</p>
      <p class="idea-description">${idea.description}</p>
    </div>`
}

