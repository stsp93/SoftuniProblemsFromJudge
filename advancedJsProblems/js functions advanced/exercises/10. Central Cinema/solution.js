function solve() {
    const [btnOnScreen, btnClear] = document.querySelectorAll('button');
    const [nameInput, hallInput, priceInput] = document.querySelectorAll('input');
    const moviesSectionUl = document.querySelector('#movies ul');
    const archiveSectionUl = document.querySelector('#archive ul');


    const onScreen = function (e) {
        e.preventDefault();
        if (nameInput.value === '' ||
            hallInput.value === '' ||
            priceInput.value === '' ||
            Number.isNaN(+priceInput.value)) return;

        const markup = `<li><span>${nameInput.value}</span><strong>Hall: ${hallInput.value}</strong><div><strong>${(+priceInput.value).toFixed(2)}</strong><input placeholder="Tickets Sold"><button>Archive</button></div></li>`

        moviesSectionUl.insertAdjacentHTML('beforeend', markup);

        nameInput.value = '';
        hallInput.value = '';
        priceInput.value = '';
    }

    const onListBtnClick = function (e) {
        if (e.target.tagName !== 'BUTTON') return;
        const ticketsSold = e.target.previousElementSibling.value
        if (ticketsSold === '' || Number.isNaN(+ticketsSold)) return;


        const liEl = e.target.parentElement.parentElement;
        const price = +e.target.previousElementSibling.previousElementSibling.textContent;
        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete'

        liEl.querySelector('strong').textContent = `Total amount: ${(price * +ticketsSold).toFixed(2)}`
        liEl.querySelector('div').remove();
        liEl.appendChild(btnDelete);
        archiveSectionUl.appendChild(liEl);
    }

    const onDelete = function (e) {
        if (e.target.textContent !== 'Delete') return;
        const liEl = e.target.parentElement.remove();
    }



    btnClear.addEventListener('click', function() {
        Array.from(archiveSectionUl.children).forEach(el => el.remove())
    })
    archiveSectionUl.addEventListener('click', onDelete)
    moviesSectionUl.addEventListener('click', onListBtnClick);
    btnOnScreen.addEventListener('click', onScreen);
}