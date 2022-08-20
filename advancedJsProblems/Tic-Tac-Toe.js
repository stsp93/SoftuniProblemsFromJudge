function solve(input) {
    const matrix = [];
    let player = true;

    for (let i = 0; i < 3; i++) {
        matrix.push([]);
        for (let j = 0; j < 3; j++) {
            matrix[i].push(false);
        }
    }
    function checkWinner(matrix, player) {
        player = player ? 'X' : 'O';
        function checkArr(arr) {
            return arr.filter(p => p === player).length === 3;
        }

        for (let i = 0; i < 3; i++) {
            if (checkArr(matrix[i])) {
                return player;
            }
        }
        for (let i = 0; i < 3; i++) {
            const col = [];
            for (let j = 0; j < 3; j++) {
                col.push(matrix[j][i]);
            }
            if (checkArr(col)) {
                return player
            }
        }

        const mainDiag = [];
        const secDiag = [];
        for (let i = 0; i < 3; i++) {
            mainDiag.push(matrix[i][i])
            secDiag.push(matrix[matrix.length - 1 - i][i]);
        }
        if (checkArr(mainDiag) || checkArr(secDiag)) {
            return player
        }
    }
    let maxMoves = 9;
    for (let index = 0; index < maxMoves; index++) {
        const move = input[index];
        const [i, j] = move.split(' ').map(Number);
        if (matrix[i][j] === 'X' || matrix[i][j] === 'O') {
            maxMoves++;
            console.log(`This place is already taken. Please choose another!`);
            continue;
        }
        matrix[i][j] = player ? 'X' : 'O';
        const winner = checkWinner(matrix, player);
        if (winner) {
            console.log(`Player ${winner} wins!`);
            return matrix.map(r => r.join('\t')).join('\n');
        }
        player = !player;
    }
    console.log(`The game ended! Nobody wins :(`);
    return matrix.map(r => r.join('\t')).join('\n');
}
console.log(solve(["0 0",
"0 1",
"0 2",
"1 1",
"1 0",
"2 1",
"2 0",
"2 1",
"2 2",
"0 0"]

));