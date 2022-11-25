export function initialize(views) {
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');

    nav.addEventListener('click', onNavigate)


    const context = {
        goTo,
        showSection,
        updateNav
    }



    function showSection(section) {
        main.replaceChildren(section)
        console.log();
    }

    function goTo(name, ...args) {
        if (typeof views[name] === 'function') {
            views[name](context, ...args)
        }
    }

    function onNavigate(ev) {
        ev.preventDefault();
        let anchor = ev.target;
        if (anchor.tagName === 'IMG') {
            anchor = anchor.parentElement
        }
        if (anchor.tagName === 'A') {
            const href = new URL(anchor.href)
            goTo(href.pathname);
        }
    }

    function updateNav() {
        const user = sessionStorage.getItem('user')
        if (user) {
            document.querySelectorAll('.user').forEach(l => l.style.display = 'block')
            document.querySelectorAll('.guest').forEach(l => l.style.display = 'none')
        } else {
            document.querySelectorAll('.user').forEach(l => l.style.display = 'none')
            document.querySelectorAll('.guest').forEach(l => l.style.display = 'block')
        }
    }

    return {
        goTo,
        updateNav
    }
}