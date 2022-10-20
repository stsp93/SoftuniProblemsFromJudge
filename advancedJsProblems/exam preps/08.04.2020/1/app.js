function solve() {
    const [taskInput, dateInput] = document.querySelectorAll('input');
    const descriptionInput = document.querySelector('#description');
    const [taskSect, openSect, inProgressSect, completeSect] = document.querySelectorAll('section');
    const addBtn = document.querySelector('#add');


    const add = function (e) {
        e.preventDefault();

        const task = taskInput.value;
        const description = descriptionInput.value;
        const date = dateInput.value;
        if (task === '' || date === '' || description === '') return;


        const article = document.createElement('article');

        const h3 = document.createElement('h3')
        h3.textContent = task;
        const descriptionP = document.createElement('p');
        descriptionP.textContent = 'Description: ' + description;
        const dateP = document.createElement('p');
        dateP.textContent = 'Due Date: ' + date;
        article.appendChild(h3);
        article.appendChild(descriptionP);
        article.appendChild(dateP);

        const flexDiv = document.createElement('div');
        flexDiv.classList.add('flex');

        const startBtn = document.createElement('button');
        startBtn.classList.add('green');
        startBtn.textContent = 'Start';
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('red');
        deleteBtn.textContent = 'Delete';
        flexDiv.appendChild(startBtn);
        flexDiv.appendChild(deleteBtn);

        article.appendChild(flexDiv);

        openSect.lastElementChild.appendChild(article);


        deleteBtn.addEventListener('click', function () {
            article.remove();
        })

        startBtn.addEventListener('click', function () {
            startBtn.remove();
            const finishBtn = document.createElement('button');
            finishBtn.classList.add('orange');
            finishBtn.textContent = 'Finish';
            flexDiv.appendChild(finishBtn);

            inProgressSect.lastElementChild.appendChild(article);

            finishBtn.addEventListener('click', function () {
                flexDiv.remove();

                completeSect.lastElementChild.appendChild(article);
            })
        })
    }


    addBtn.addEventListener('click', add)

}