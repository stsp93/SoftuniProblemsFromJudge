function solution() {
    const inputFieldEl = document.querySelector('input');
    const addGiftBtn = document.querySelector('button');
    const [listCard, sentEl, discardCard] = document.querySelectorAll('.card ul');


    function addGift() {
        // Create el
        const giftLi = document.createElement('li')
        giftLi.classList.add('gift');
        const name = inputFieldEl.value

        const sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.id = 'sendButton';

        const discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.id = 'discardButton';

        giftLi.textContent = name;
        giftLi.appendChild(sendButton);
        giftLi.appendChild(discardButton);


        listCard.appendChild(giftLi);
        inputFieldEl.value = ''
        // Sort list

        const allItems = Array.from(listCard.querySelectorAll('li'));

        allItems.sort((a,b) => a.textContent.localeCompare(b.textContent));

        listCard.innerHTML = ''
        allItems.forEach(el => listCard.appendChild(el));

        // Buttons

        sendButton.addEventListener('click', function send(e){
            const sentLi = document.createElement('li');
            sentLi.textContent = name;

            sentEl.appendChild(sentLi);
            e.target.parentElement.remove()

        })

        discardButton.addEventListener('click', function send(e){
            const discardLi = document.createElement('li');
            discardLi.textContent = name;

            discardCard.appendChild(discardLi);
            e.target.parentElement.remove()

        })
    }


    addGiftBtn.addEventListener('click', addGift);
}