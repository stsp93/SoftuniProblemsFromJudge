
module.exports = function (selectedOption) {
    const options = [
        { value: 'val1', label: 'lab1', selected: false },
        { value: 'val2', label: 'lab2', selected: false },
    ]
    const selectedOption = options.find(sel => sel.value === selectedOption);
    if (selectedOption) selectedOption.selected = true;

    return options;
}

