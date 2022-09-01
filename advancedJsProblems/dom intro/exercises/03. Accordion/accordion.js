function toggle() {
    const btn = document.querySelector('.button');
    const extra = document.querySelector('#extra')
    btn.textContent = btn.textContent === 'More' ? 'Less' : 'More';
    console.log(extra.style.display);
    extra.style.display = extra.style.display === 'none' ? 'block' : 'none';
    console.log('TODO:...');
}