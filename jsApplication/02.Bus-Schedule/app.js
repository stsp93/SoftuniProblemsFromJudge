function solve() {
    const infoEl = document.querySelector('.info');
    const [departBtn, arriveBtn] = document.querySelectorAll('input')
    let state = {'next':'depot'}

    async function depart() {

        try {
            const res = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${state.next}`);
            const data = await res.json();
            state = {'next': data.next, 'name':data.name}
            infoEl.textContent = `Next stop ${data.name}`;

            departBtn.disabled = true;
            arriveBtn.disabled = false;

        } catch (err) {
            console.log(err);
        }

    }

    function arrive() {
        departBtn.disabled = false;
            arriveBtn.disabled = true;

            infoEl.textContent = `Arriving at ${state.name}`;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();


//Object { name: "Depot", next: "0361" }