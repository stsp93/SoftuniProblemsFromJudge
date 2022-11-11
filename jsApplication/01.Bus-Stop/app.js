function getInfo() {
    const busesUl = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
        .then(res => res.json())
        .then(data => render(data.name,data.buses))
        .catch(err => {
            stopName.textContent = 'Error';
            busesUl.innerHTML = '';
        });




    function render(name, results) {
        busesUl.innerHTML = '';
        stopName.textContent = name;
        Object.entries(results).map(([busId, time]) => {

            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            return li
        }).forEach(el => busesUl.appendChild(el));
    }
}

