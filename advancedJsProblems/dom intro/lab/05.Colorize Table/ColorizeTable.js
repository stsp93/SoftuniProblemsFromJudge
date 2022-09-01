function colorize() {
    // TODO
    const trElems =Array.from( document.querySelectorAll('table tr'));
    for(let i = 1; i< trElems.length; i+=2){
        trElems[i].style.backgroundColor = 'teal'
    }
}