function attachEventsListeners() {
    const inputEl = document.querySelector('#inputDistance');
    const outputEl = document.querySelector('#outputDistance');

    const inputUnitsEl = document.querySelector('#inputUnits');
    const outputUnitsEl = document.querySelector('#outputUnits');

    const btn = document.querySelector('#convert');

    const onClick = function () {
        const unitsMap = {
            'km': 1000,
            'cm': 0.01,
            'm': 1,
            'mm': 0.001,
            'mi': 1609.34,
            'yrd': 0.9144,
            'ft': 0.3048,
            'in': 0.0254,
        }
        const value = inputEl.value;
        const from = inputUnitsEl.value
        const to = outputUnitsEl.value

        outputEl.value = unitsMap[from] / unitsMap[to] * value 
    }

    btn.addEventListener('click', onClick);

}