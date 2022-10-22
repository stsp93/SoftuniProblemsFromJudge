window.addEventListener('load', solve);

function solve() {
    const typeSelect = document.querySelector('#type-product');
    const descriptionIn = document.querySelector('#description');
    const [nameIn, phoneIn] = document.querySelectorAll('input');
    const sendBtn = document.querySelector('form button');
    const clearBtn = document.querySelector('.clear-btn')
    const receivedOrders = document.querySelector('#received-orders');
    const completedOrders = document.querySelector('#completed-orders');

    function send(e) {
        e.preventDefault();

        const type = typeSelect.value;
        const description = descriptionIn.value;
        const name = nameIn.value;
        const phone = phoneIn.value;

        if (description === '' || name === '' || phone === '') return;

        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');
        const typeH2 = document.createElement('h2');
        typeH2.textContent = 'Product type for repair: ' + type;
        const clientInfoH3 = document.createElement('h3');
        clientInfoH3.textContent = `Client information: ${name}, ${phone}`;
        const descriptionH4 = document.createElement('h4');
        descriptionH4.textContent = 'Description of the problem: ' + description;
        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start repair';
        startBtn.classList.add('start-btn');
        const finishBtn = document.createElement('button');
        finishBtn.classList.add('finish-btn');
        finishBtn.textContent = 'Finish repair';
        finishBtn.disabled = true;

        containerDiv.appendChild(typeH2);
        containerDiv.appendChild(clientInfoH3);
        containerDiv.appendChild(descriptionH4);
        containerDiv.appendChild(startBtn);
        containerDiv.appendChild(finishBtn);

        receivedOrders.appendChild(containerDiv)

        descriptionIn.value = '';
        nameIn.value = '';
        phoneIn.value = '';

        startBtn.addEventListener('click', function() {
            startBtn.disabled = true;
            finishBtn.disabled = false;
        })

        finishBtn.addEventListener('click', function() {
            completedOrders.appendChild(containerDiv);
            startBtn.remove();
            finishBtn.remove();
        })
    }

    sendBtn.addEventListener('click', send)
    clearBtn.addEventListener('click', function() {
       Array.from(completedOrders.querySelectorAll('.container')).forEach(e=> e.remove());
    })

}