function generateReport() {
    let textEl =new String(document.querySelector('#output')) ;

    const tdElsArr = Array.from(document.querySelectorAll('tbody td'))
    const checkboxesArr = Array.from(document.querySelectorAll('th input'))

    const checkboxHTML = document.getElementsByClassName('checkbox');
    const checkboxNode = document.querySelectorAll('.checkbox');

    function forOf(collection) {
        for(let el of collection) {
            console.log(el);
        }
    }

    function forLoop(collection) {
        for(let i =0; i< collection.length; i++){
            console.log(collection[i]);
        }
    }
    console.log('---------HTMLCOL');
    forLoop(checkboxHTML);
    console.log('--------- NODE :');
    forLoop(checkboxNode);

    const outputArr = [];
    const checkboxMap = {}
    for (let i = 0; i < checkboxesArr.length; i++) {
        checkboxMap[checkboxesArr[i].name] = i;
    }
    let iterations = 0;
    for (let checkbox of checkboxesArr) {
        let index = 0;
        if (checkbox.checked) {
            for (let i = checkboxMap[checkbox.name]; i < tdElsArr.length; i += checkboxesArr.length) {
                if (!outputArr[index]) {
                    outputArr[index] = {};
                };
                iterations++;

                outputArr[index++][checkbox.name] = tdElsArr[i].textContent;
            }
        }
    }
    textEl.value = JSON.stringify(outputArr)
    
}
