function lockedProfile() {
    const mainEl = document.querySelector('#main');

    const onClick = function (e) {
        if (e.target.nodeName !== 'BUTTON') return;
        const profileEl = e.target.parentElement
        const checked = Array.from(profileEl.children).filter(e => e.checked === true)[0];
        const state = checked.value;

        if(state === 'lock') return;
         
        profileEl.querySelector('div').style.display = profileEl.querySelector('div').style.display === 'block'? '' : 'block';
        e.target.textContent = e.target.textContent ==='Hide it'? 'Show more': 'Hide it'
        
    }

    mainEl.addEventListener('click', onClick);
}