function solve() {
    const checkTextEl = document.querySelector('#check p');
    const rowEls = Array.from(document.querySelectorAll('tbody tr'));
    const boxesEls = Array.from(document.querySelectorAll('tbody td input'));
    const tableEl = document.querySelector('table')
    const [btnCheck, btnClear] = document.querySelectorAll('button');

    const onCheck = function () {
        const gameMatrix = [];
        // Populate Matrix
        for (let i = 0; i < rowEls.length; i++) {
            gameMatrix.push([]);
            for (let el of Array.from(rowEls[i].children)) {
                gameMatrix[i].push(+el.children[0].value)
            }
        }

        checkTextEl.textContent = 'adsasdasd'
        // Check line function
        const length = gameMatrix[0].length

        const checkLine = function(lineArr) {
            const line = lineArr.slice()
            line.sort((a,b) => a-b);         
            for(let i = 1; i<= length;i++){
                if(line[i-1] !== i) return false;
            }
            return true
        }

        // Final Check
        const finalCheck = function(bool) {
            if(bool) {
                tableEl.style.border = '2px solid green';
                checkTextEl.textContent = 'You solve it! Congratulations!';
                checkTextEl.style.color = 'green'
            } else {
                tableEl.style.border = '2px solid red';
                checkTextEl.textContent = 'NOP! You are not done yet...';
                checkTextEl.style.color = 'red'
            }
        }

        // Check rows and cols
        for (let i = 0; i < length; i++) {
            const col = [];
            const row = gameMatrix[i];
            for (let j = 0; j < length; j++) {
                col.push(gameMatrix[j][i])
            }

            if(!checkLine(col) || !checkLine(row)) {
                finalCheck(false);
                return;
            }
        }

        
        finalCheck(true);
    };


    const onClear = function () {
        boxesEls.forEach(el => el.value = '');
        tableEl.style.border = 'none';
        checkTextEl.textContent = '';
    };

    btnCheck.addEventListener('click', onCheck);
    btnClear.addEventListener('click', onClear);
}