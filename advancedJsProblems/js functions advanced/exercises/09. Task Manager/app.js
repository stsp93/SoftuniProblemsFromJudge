function solve() {
    const btnAdd = document.querySelector('#add');
    const taskEl = document.querySelector('#task');
    const descriptionEl = document.querySelector('#description');
    const dateEl = document.querySelector('#date');
    const openSection = document.querySelector('section').nextElementSibling;
    const progressSection = openSection.nextElementSibling
    const completeSection = progressSection.nextElementSibling

    function createElement(type, text, className) {
        let result = document.createElement(type);
 
        result.textContent = text;
 
        if (className) {
            result.className = className;
        }
        return result;
    }

    function onAdd(e) {
        e.preventDefault();
        if (taskEl.value === '' || descriptionEl.value === '' || dateEl.value === '') return;
        const task = taskEl.value
        const description = `Description: ${descriptionEl.value}`
        const date = `Due Date: ${dateEl.value}`


        const articleEl = createElement('article');
        const headerEl = createElement('h3', task);
        const taskDescriptionEl = createElement('p', description);
        const taskDateEl = createElement('p',date);
        const flexDiv = createElement('div',null,'flex');
        const btnStart = createElement('button','Start','green');
        const btnDelete = createElement('button','Delete','red');
        flexDiv.appendChild(btnStart);
        flexDiv.appendChild(btnDelete);


        articleEl.appendChild(headerEl);
        articleEl.appendChild(taskDescriptionEl);
        articleEl.appendChild(taskDateEl);
        articleEl.appendChild(flexDiv);

        openSection.children[1].appendChild(articleEl);

        dateEl.value = '';
        taskEl.value = '';
        descriptionEl.value = '';
    }


    function onBoardClick(e) {
        if (e.target.tagName !== "BUTTON") return;
        const article = e.target.parentElement.parentElement;
        const btnColor = e.target.className;

        if (btnColor === 'red') {
            article.remove();
        } else if (btnColor === 'green') {
            progressSection.children[1].appendChild(article);
            const btnStart = article.querySelector('.green');
            btnStart.className = 'orange';
            btnStart.textContent = 'Finish'
            article.querySelector('.flex').appendChild(btnStart)
        } else if (btnColor === 'orange') {
            completeSection.children[1].appendChild(article);
            article.querySelector('.flex').remove();
        }

    }

    btnAdd.addEventListener('click', onAdd);
    [openSection,progressSection].forEach(s => s.addEventListener('click', onBoardClick));
}