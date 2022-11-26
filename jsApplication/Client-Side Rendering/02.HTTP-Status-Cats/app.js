import { cats } from './catSeeder.js'
import { html, render } from '../node_modules/lit-html/lit-html.js'

const section = document.getElementById('allCats');
section.addEventListener('click', onClick);

const allCats = catsList => html`<ul>
    ${cats.map(catListElement)}
</ul>`

const catListElement = cat => html`<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="100">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

render(allCats(cats), section);

function onClick(e) {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;

    const statusEl = btn.nextSibling.nextSibling;
    if (statusEl.style.display === 'none'){
        statusEl.style.display = 'block';
        btn.textContent = 'Hide status code'
    } else {
        statusEl.style.display = 'none';
        btn.textContent = 'Show status code'
    }

    

}

