function encodeAndDecodeMessages() {
    const [msgEl, lastMsgEl]=document.querySelectorAll('textarea');
    const [encodeBtnEl, decodeBtnEl] = document.querySelectorAll('button'); 


    const encodeAndSend = function() {
        let text = msgEl.value;
        text = text.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) + 1)).join('');
        lastMsgEl.value = text;
        msgEl.value = ''
    }

    const decodeAndRead = function () {
        let text = lastMsgEl.value;
        text = text.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) - 1)).join('');
        lastMsgEl.value = text;
    }

    encodeBtnEl.addEventListener('click', encodeAndSend);
    decodeBtnEl.addEventListener('click', decodeAndRead);
}