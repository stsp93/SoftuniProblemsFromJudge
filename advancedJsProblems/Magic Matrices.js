function solve(matrix) {
    function sumArr(arr) {
        return arr.reduce((acc, cur) => acc + cur, 0)
    }
    const sumCheck =sumArr(matrix[0]);
    
    for (let row of matrix) {
        if(sumArr(row) !== sumCheck){
            return false;
        }
    }
    for(let i = 0 ; i < matrix[0].length; i++) {
        const col = [];
        for(let j = 0; j < matrix.length; j++) {
            col.push(matrix[j][i]);
        }
        if(sumArr(col) !== sumCheck) {
            return false
        }
    }
    return true;
}
console.log(solve([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
   
   
   ));