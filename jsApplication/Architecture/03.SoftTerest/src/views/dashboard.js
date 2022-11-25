const section = document.getElementById('dashboard-holder');
import { loadAllIdeas } from "../api/data.js";

section.addEventListener('click', showIdeaDetails)

let ctx;

export function showDashboard(context) {
    context.showSection(section);
    ctx = context;

    showIdeas()
}

async function showIdeas() {
    const ideasList = await loadAllIdeas();
    if (ideasList.length === 0) {
        section.replaceChildren()
    }
    if (ideasList.length === 0) {
        section.innerHTML = `        </div>
        <h1>No ideas yet! Be the first one :)</h1>
      </div>`
    } else {
        section.replaceChildren(...ideasList.map(i => createIdeaMarkup(i)));
    }


}

function createIdeaMarkup(idea) {
    const div = document.createElement('div');
    div.classList.add('card', 'overflow-hidden', 'current-card', 'details')
    div.style.width = '20rem';
    div.style.height = '18rem';
    div.innerHTML = `<div class="card-body">
    <p class="card-text">${idea.title}</p>
</div>
<img
    class="card-image"
    src="${idea.img}"
    alt="Card image cap"
/>
<a data-id="${idea._id}" class="btn" href="">Details</a>`

    return div;
}

function showIdeaDetails(ev) {
    ev.preventDefault();
    const target = ev.target
    if (target.tagName !== 'A') return;

    const id ='/' + target.dataset.id;

    ctx.goTo('/details', id)
}
