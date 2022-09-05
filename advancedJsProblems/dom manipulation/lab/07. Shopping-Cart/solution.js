function solve() {
   const shoppingCartEl = document.querySelector('.shopping-cart');
   const btnCheckout = document.querySelector('.checkout');
   const textArea = document.querySelector('textarea');

   let total = 0;
   let list = []

   const onAdd = function (e) {
      if (!Array.from(e.target.parentElement.classList).includes('product-add')) return;
      const productEl = e.target.parentElement.parentElement;
      const money = +productEl.children[3].textContent;
      const name = productEl.children[1].children[0].textContent
      textArea.value += `Added ${name} for ${money.toFixed(2)} to the cart.\n`
      total += money;
      list.push(name);
   }

   const onCheckout = function() {
      const uniqueList = Array.from(new Set(list))
      textArea.value += `You bought ${uniqueList.join(', ')} for ${total.toFixed(2)}.`
      shoppingCartEl.removeEventListener('click',onAdd)
      btnCheckout.removeEventListener('click',onCheckout)
   };

   shoppingCartEl.addEventListener('click', onAdd)
   btnCheckout.addEventListener('click', onCheckout)
   
}
function clear() {
   document.querySelector('textarea').value = '';
}
