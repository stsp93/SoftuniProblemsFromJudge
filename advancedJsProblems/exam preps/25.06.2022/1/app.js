window.addEventListener("load", solve);

function solve() {
  const [makeIn, modelIn, yearIn, originalCostIn, sellingPriceIn] = document.querySelectorAll('input');
  const fuelIn = document.querySelector('#fuel');

  const publishBtn = document.querySelector('#publish');

  const tablebody = document.querySelector('#table-body');
  const carList = document.querySelector('#cars-list');
  const profitEl = document.querySelector('#profit');


  function publish(e) {
    e.preventDefault();

    const make = makeIn.value;
    const model = modelIn.value;
    const year = yearIn.value;
    const originalCost = +originalCostIn.value;
    const sellingPrice = +sellingPriceIn.value;
    const fuel = fuelIn.value;

    if (make === '' || model === '' || year === '' || originalCost > sellingPrice) return;


    const row = document.createElement('tr');
    row.classList.add('row');
    const makeTd = document.createElement('td');
    makeTd.textContent = make;
    const modelTd = document.createElement('td');
    modelTd.textContent = model;
    const yearTd = document.createElement('td');
    yearTd.textContent = year;
    const fuelTd = document.createElement('td');
    fuelTd.textContent = fuel;
    const originalCostTd = document.createElement('td');
    originalCostTd.textContent = originalCost;
    const sellingPriceTd = document.createElement('td');
    sellingPriceTd.textContent = sellingPrice;

    const btnTd = document.createElement('t');
    const editBtn = document.createElement('button');
    editBtn.classList.add('action-btn');
    editBtn.classList.add('edit');
    editBtn.textContent = 'Edit';
    const sellBtn = document.createElement('button');
    sellBtn.classList.add('action-btn');
    sellBtn.classList.add('sell');
    sellBtn.textContent = 'Sell';

    btnTd.appendChild(editBtn)
    btnTd.appendChild(sellBtn)

    row.appendChild(makeTd)
    row.appendChild(modelTd)
    row.appendChild(yearTd)
    row.appendChild(fuelTd)
    row.appendChild(originalCostTd)
    row.appendChild(sellingPriceTd)
    row.appendChild(btnTd)

    makeIn.value = ''
      modelIn.value = ''
      yearIn.value = ''
      originalCostIn.value = ''
      sellingPriceIn.value = ''
      fuelIn.value = '';

    tablebody.appendChild(row);

    editBtn.addEventListener('click', function () {
      makeIn.value = make;
      modelIn.value = model;
      yearIn.value = year;
      originalCostIn.value = originalCost;
      sellingPriceIn.value = sellingPrice;
      fuelIn.value = fuel;

      row.remove();
    });

    sellBtn.addEventListener('click', function() {

      const li = document.createElement('li');
      li.classList.add('each-list');
      const makeSpan = document.createElement('span');
      makeSpan.textContent = make + ' ' + model;
      const yearSpan = document.createElement('span');
      yearSpan.textContent = year;
      const difSpan = document.createElement('span');
      difSpan.textContent = +sellingPrice - +originalCost;

      li.appendChild(makeSpan);
      li.appendChild(yearSpan);
      li.appendChild(difSpan);
      
      row.remove();
      carList.appendChild(li)
      profitEl.textContent = (+profitEl.textContent + +difSpan.textContent).toFixed(2);
    })
  }


  publishBtn.addEventListener('click', publish)
}
