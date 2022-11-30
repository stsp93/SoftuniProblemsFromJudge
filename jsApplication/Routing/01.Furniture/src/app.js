import page from "../node_modules/page/page.mjs";
import { showCreate } from './views/create.js';
import { render } from './lib.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { showMyFurniture } from './views/my-furniture.js';
import { showRegister } from './views/register.js';
import { logout } from './api/user.js';



function decorateContext(ctx, next) {
    ctx.updateNav = updateUserNav;
    ctx.render = function (section) {
        render(section, document.querySelector('div.container'))
    }
    ctx.navActive = function(link) {
        nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        
        nav.querySelector('#'+link).classList.add('active');
    }
    next();
}
const nav = document.querySelector('nav');
const userNav = document.getElementById('user')
const guestNav = document.getElementById('guest')

function updateUserNav(ctx, next) {
    const user = sessionStorage.getItem('user');
    if(user) {
        userNav.style.display = 'inline-block'
        guestNav.style.display = 'none'
    } else {
        userNav.style.display = 'none'
        guestNav.style.display = 'inline-block'
    }
    nav.style.display = ''
}

function onLogout(ctx) {
    logout();
    ctx.updateNav()
    ctx.page.redirect('/index')
}

page(decorateContext);
page.redirect('/', '/index')

page('/index', showDashboard)
page('/details/:id', showDetails)
page('/edit/:id', showEdit)
page('/login', showLogin)
page('/my-furniture', showMyFurniture)
page('/register', showRegister)
page('/create', showCreate)
page('/logout', onLogout)


page.start();
