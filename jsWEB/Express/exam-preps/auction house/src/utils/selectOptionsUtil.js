
exports.optionsTemplate = function (selectedValue) {
    const options = [
        { value: 'Real Estate', label: 'Real Estate', selected: false },
        { value: 'Vehicles', label: 'Vehicles', selected: false },
        { value: 'Furniture', label: 'Furniture', selected: false },
        { value: 'Electronics', label: 'Electronics', selected: false },
        { value: 'Other', label: 'Other', selected: false },
    ]
    const selectedOption = options.find(sel => sel.value === selectedValue);
    if (selectedOption) selectedOption.selected = true;

    return options;
}

