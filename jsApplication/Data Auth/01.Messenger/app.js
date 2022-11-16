function attachEvents() {
    const [authorIn, msgIn, sendBtn, refreshBtn] = document.querySelectorAll('input');
    const messagesEl = document.getElementById('messages')
    const URL = 'http://localhost:3030/jsonstore/messenger'

    async function send() {
        const data = {
            author: authorIn.value,
            content: msgIn.value,
        }

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const sendData = await res.json();

        console.log(sendData);
        messagesEl.value += `${sendData.author}: ${sendData.content}\n`
    }


    async function refresh() {
        const res = await fetch(URL);
        const data = await res.json();
        messagesEl.value = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n');

    }


    sendBtn.addEventListener('click', send);
    refreshBtn.addEventListener('click', refresh)
}



attachEvents();