function wordsUppercase(input) {
    return input.split(/\W+/g).map(w => {
        return w.toUpperCase(w)}).filter(w => w !== '').join(', ')
}
console.log(wordsUppercase('Hi, how are you?'));