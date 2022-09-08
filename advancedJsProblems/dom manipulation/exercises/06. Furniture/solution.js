function solve() {
  const [inputEl, outputEl] = document.querySelectorAll('textarea');
  const [generateBtn, buyBtn] = document.querySelectorAll('button');
  const tbody = document.querySelector('tbody');

  const onGenerate = function () {
    const input = JSON.parse(inputEl.value);
    const markupArr = input.map(obj => {
      const el = document.createElement('tr');
      el.innerHTML = `<td><img src="${obj.img}"></td><td><p>${obj.name}</p></td><td><p>${obj.price}</p></td><td><p>${obj.decFactor}</p></td><td><input type="checkbox"/></td>`
    
      return el
    })
    markupArr.forEach(el => tbody.appendChild(el))
  }

  const onBuy = function () {
    let totalPrice = 0;
    let factorTotal = 0;
    let products = [];
    const checked = Array.from(tbody.querySelectorAll('input')).filter(check => check.checked);
    checked.forEach(checked => {
      const row = checked.parentElement.parentElement.children;
      // const row = checked.closest('tr').children
      const name = row[1].textContent;
      const price = +row[2].textContent;
      const decFactor = +row[3].textContent;
      console.log(decFactor);
      products.push(name.trim())
      totalPrice += price;
      factorTotal += decFactor;
    });

    outputEl.value = `Bought furniture: ${products.join(', ')}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${(factorTotal / products.length)}`

  }


  generateBtn.addEventListener('click', onGenerate);
  buyBtn.addEventListener('click', onBuy);


  // function clear() {
  //   outputEl.value = ''
  // }
  // clear()
}