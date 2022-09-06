function addItem() {
    const value = document.querySelector('#newItemValue');
    const text = document.querySelector('#newItemText');
    const menu = document.querySelector('#menu');

    const optionEl = document.createElement('option');
    optionEl.value = value.value;
    optionEl.textContent= text.value;

    value.value = '';
    text.value = ''

    menu.appendChild(optionEl)
}