class Textbox {
    constructor(selector, regex) {
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;
    }
    get value() {
        return this._elements[0].value
    }
    set value (value) {
        Array.from(this._elements).forEach(e => e.value = value);
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        return !Array.from(this._elements).some(el => this._invalidSymbols.test(el.value));
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('textbox');
console.log(inputs);

inputs[1].addEventListener('click',function(){console.log(textbox.value);});
textbox.isValid()
