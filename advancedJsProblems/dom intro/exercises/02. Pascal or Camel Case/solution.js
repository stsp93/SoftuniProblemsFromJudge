function solve() {
  //TODO...
  let result = document.querySelector('#result')
  const text = document.querySelector('#text').value
  const namingConvention = document.querySelector('#naming-convention').value;
  const convention = {
    'Camel Case':text[0].toLowerCase() + text.split(' ').map(w => w[0].toUpperCase() +  w.slice(1).toLowerCase()).join('').slice(1),
    'Pascal Case': text.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(''),
  };

  if(!convention[namingConvention]) {
    result.textContent = 'Error!'
  } else {
    result.textContent = convention[namingConvention];
  }
}