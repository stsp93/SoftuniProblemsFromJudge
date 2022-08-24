function equalNeighbors(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;
    for(let i = 0; i < cols; i++) {
        for(let j =0; j < rows - 1; j++) {
            if(matrix[j][i] === matrix[j+1][i]){
                count++;
            }
        }
    }

    for(let i = 0; i < rows; i++) {
        for(let j =0; j < cols - 1; j++) {
            if(matrix[i][j] === matrix[i][j+1]){
                count++;
            }
        }
    }
    return count;
}
console.log(equalNeighbors([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]

));