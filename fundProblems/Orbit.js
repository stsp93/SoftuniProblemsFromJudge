'use strict'
function orbit(input) {
    const [width, height, x, y] = input;
    const matrix = [];
    //Matrix build
    for(let i = 0; i < width; i++){
        matrix.push([]);
    };
    //Orbit logic
    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
            matrix[row][col] = Math.max(Math.abs(row - x), Math.abs(col - y)) + 1
        }
    }



    matrix.forEach(r => console.log(...r))
}
orbit([5, 5, 6 ,6]);

