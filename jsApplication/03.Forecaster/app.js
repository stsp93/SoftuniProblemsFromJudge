function attachEvents() {
    const [locIn, getBtn] = document.querySelectorAll('input');
    const forecastEl = document.getElementById('forecast');
    const currentEl = document.querySelector('#current');
    const upcomingEl = document.querySelector('#upcoming');

    const symbols = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176'   // °

    }



    let state = { name, upcoming: null, today: null }

    async function get() {
        try {
            const res = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);
            if (!res.ok) throw new Error();
            let data = await res.json();
            console.log(data);

            data = data.find(c => c.name === locIn.value);

            const todayRes = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${data.code}`);
            const todayData = await todayRes.json();

            const upcomingRes = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${data.code}`);
            const upcomingData = await upcomingRes.json();

            state.today = todayData;
            state.upcoming = upcomingData;
            state.name = state.today.name

            console.log(state);

            const forecastsDiv = document.createElement('div')
            forecastsDiv.classList.add('forecasts')
            const conditSymbol = document.createElement('span');
            conditSymbol.innerHTML = symbols[state.today.forecast.condition];
            conditSymbol.classList.add('condition');
            conditSymbol.classList.add('symbol');
            const spanWrap = document.createElement('span');
            spanWrap.classList.add('condition');
            const city = document.createElement('span');
            city.textContent = state.name
            const temp = document.createElement('span');
            temp.innerHTML = `${state.today.forecast.low}${symbols['Degrees']}/${state.today.forecast.high}${symbols['Degrees']}`
            const condit = document.createElement('span');
            condit.textContent = state.today.forecast.condition;

            [city, temp, condit].forEach(el => {
                el.classList.add('forecast-data');
                spanWrap.appendChild(el)
            })
            forecastsDiv.appendChild(conditSymbol)
            forecastsDiv.appendChild(spanWrap)

            currentEl.appendChild(forecastsDiv)


            const upcomDiv = document.createElement('div');
            upcomDiv.classList.add('forecast-info')

            const markup = state.upcoming.forecast.map(d => `
            <span class="upcoming">
                <span class="symbol">${symbols[d.condition]}</span>
                <span class="forecast-data">${d.low}${symbols['Degrees']}/${d.high}${symbols['Degrees']}</span><span class="forecast-data">${d.condition}</span>
            </span>`).join('');


upcomDiv.insertAdjacentHTML('beforeend', markup)
upcomingEl.appendChild(upcomDiv)


            

// forecast: Array(3) [ {…}, {…}, {…} ]
// ​​
// 0: Object { condition: "Rain", high: "8", low: "6" }
// ​​
// 1: Object { condition: "Rain", high: "11", low: "3" }
// ​​
// 2: Object { condition: "Rain", high: "8", low: "5" }
// ​​
// length: 3


        } catch (err) {
            console.error(err);
            forecastEl.textContent = 'Error'
        }
        forecastEl.style.display = '';



    }


    getBtn.addEventListener('click', get);
}

attachEvents();