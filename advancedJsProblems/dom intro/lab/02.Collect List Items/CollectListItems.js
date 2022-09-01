function extractText() {
    const elArr = Array.from(document.querySelectorAll('#items li') );
    const result = document.querySelector('#result');
    result.value = elArr.map(e => e.textContent).join('\n');
}