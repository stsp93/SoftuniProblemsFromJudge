const inputEl = document.querySelector('#newItemText');
const itemsEl = document.querySelector('#items');
// Event Delegation on items
itemsEl.addEventListener('click', deleteItem);

function addItem() {
    
    
    
    //create li
    const newLi = document.createElement('li');
    newLi.textContent = inputEl.value;  
    itemsEl.appendChild(newLi);
    
    //create <a> [delete]
    const deleteEl = document.createElement('a');
    deleteEl.href = '#'
    deleteEl.textContent = '[Delete]';
    
    //attach to new li
    newLi.appendChild(deleteEl);
    
    
    inputEl.value = ''
}
function deleteItem(e) {
    if(e.target.textContent !== '[Delete]') return;
    e.target.parentElement.remove();
    console.log('fn called');
}