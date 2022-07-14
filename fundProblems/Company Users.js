'use strict';
function companyUsers(input) {
    const companies = {};
    for(let data of input) {
        let [company, id] = data.split(' -> ');
        companies.hasOwnProperty(company) ? companies[company].push(id) : companies[company] = [id];
    }
    let sortedCompanies = Object.entries(companies).sort((a, b) => a[0].localeCompare(b[0]));
    // console.log(sortedCompanies);
    for(let [company, employees] of sortedCompanies) {
        let ids = Array.from(new Set(employees));
        console.log(company);
        ids.forEach(id => console.log(`-- ${id}`));
    }
}
companyUsers([
    'SoftUni -> AA12345',
    'SoftUni -> CC12344',
    'Lenovo -> XX23456',
    'SoftUni -> AA12345',
    'Movement -> DD11111'
    ]
    
    )