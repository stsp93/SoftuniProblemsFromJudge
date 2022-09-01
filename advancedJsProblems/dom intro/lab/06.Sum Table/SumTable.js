function sumTable() {
    let tdElsArr = Array.from(document.querySelectorAll('table td')).slice(1, -1);
    const sum = document.querySelector('#sum')
    const total = tdElsArr.filter((e, i) => i %2 === 0).reduce((acc, cur) => acc + +cur.textContent, 0);
    console.log(sum);
    sum.textContent = total;
}