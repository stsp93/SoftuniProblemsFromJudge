function pieceOfPie(flavorsArr, flavor1, flavor2) {
    // const start = flavorsArr.indexOf(flavor1);
    // const end = flavorsArr.indexOf(flavor2);
    // const output = []
    // for (let i = start; i <= end; i++) {
    //     output.push(flavorsArr[i])
    // }
    // return output;
    return flavorsArr.slice(flavorsArr.indexOf(flavor1), flavorsArr.indexOf(flavor2) + 1)
}
console.log(pieceOfPie(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'
));