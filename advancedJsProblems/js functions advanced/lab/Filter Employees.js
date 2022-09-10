function filterEmployees(data, criteria) {
    const employees = JSON.parse(data);

    function output(arr) {
        return arr.map((el, i) => `${i}. ${el['first_name']} ${el['last_name']} - ${el['email']}`).join('\n');
    }

    if (criteria === 'all') return output(employees)

    const [key, value] = criteria.split('-');
    const filteredArr = employees.filter(emp => emp[key] === value);

    return output(filteredArr);
}

console.log(filterEmployees(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'
));
