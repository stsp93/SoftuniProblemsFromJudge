function extract(content) {
    const pText = document.querySelector(`#${content}`).textContent;
    const pattern = /\(.+?\)/g
    const match = pText.match(pattern).map(m => m.slice(1,-1));
    return match.join('; ');
}