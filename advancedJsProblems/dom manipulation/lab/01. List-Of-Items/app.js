function addItem() {
    const inputEl = document.querySelector('#newItemText');
    const itemsEl = document.querySelector('#items');
    const newLi = document.createElement('li');


    newLi.textContent = inputEl.value;  
    itemsEl.appendChild(newLi);

    inputEl.value = ''
}