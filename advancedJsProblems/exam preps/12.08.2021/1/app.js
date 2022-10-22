window.addEventListener('load', solve);

function solve() {

    const [modelIn, yearIn, priceIn] = document.querySelectorAll('input');
    const descriptionIn = document.querySelector('#description');
    const btnAdd = document.querySelector('#add');
    const furnitureList =document.querySelector('#furniture-list');
    const totalPrice = document.querySelector('.total-price');


    function add(e) {
        e.preventDefault();
        const model = modelIn.value;
        const year = yearIn.value;
        const description = descriptionIn.value;
        const price = priceIn.value;

        if (model === '' || year === '' || description === '' || price === '' || year <= 0 || price <= 0) return;

        const infoTr = document.createElement('tr');
        infoTr.classList.add('info');
        const modelTd = document.createElement('td');
        modelTd.textContent = model;
        const priceTd = document.createElement('td');
        priceTd.textContent = Number(price).toFixed(2);

        const btnsTd = document.createElement('td');
        const moreBtn = document.createElement('button');
        moreBtn.classList.add('moreBtn');
        moreBtn.textContent = 'More Info'
        const buyBtn = document.createElement('button');
        buyBtn.classList.add('buyBtn');
        buyBtn.textContent = 'Buy it'
        btnsTd.appendChild(moreBtn)
        btnsTd.appendChild(buyBtn)

        infoTr.appendChild(modelTd)
        infoTr.appendChild(priceTd)
        infoTr.appendChild(btnsTd)

        const hideTr = document.createElement('tr');
        hideTr.classList.add('hide');
        const yearTd = document.createElement('td');
        yearTd.textContent = 'Year: ' + year;
        const descriptionTd = document.createElement('td');
        descriptionTd.textContent = 'Description: ' + description;
        descriptionTd.colSpan = 3;
        hideTr.appendChild(yearTd);
        hideTr.appendChild(descriptionTd);


        furnitureList.appendChild(infoTr)
        furnitureList.appendChild(hideTr)

        moreBtn.addEventListener('click', function () {
            moreBtn.textContent = moreBtn.textContent === 'Less Info' ? 
            'More Info' : 'Less Info';
            hideTr.style.display = hideTr.style.display === 'contents' ? 
            'none' : 'contents';
        })

        buyBtn.addEventListener('click', function() {
            totalPrice.textContent = Number(+totalPrice.textContent + +price).toFixed(2);
            infoTr.remove()
            hideTr.remove()
        })
    }


    btnAdd.addEventListener('click', add)
}
