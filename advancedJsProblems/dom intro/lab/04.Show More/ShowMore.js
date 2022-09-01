function showText() {
    // TODO
    const text = document.querySelector('#text');
    const readMore = document.querySelector('#more');
    text.classList.toggle('hidden');
    readMore.textContent = readMore.textContent === 'Read more ...' ? 'Read less': 'Read more ...';

}