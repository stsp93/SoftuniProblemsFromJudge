import { logout } from "./api/user.js";
import { page } from "./lib.js";
import { decoratorCtx } from "./middleware.js";
import { showNav } from "./views/nav.js";
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';



page(decoratorCtx)
page(showNav);
page('/', showHome)
page('/logout', onLogout)
page('/login', showLogin)
page('/register', showRegister)
page('/catalog', showCatalog)
page('/create', showCreate)
page('/details/:id', showDetails)
page('/edit/:id', showEdit)


page.start();

async function onLogout(ctx, next) {
    const res = await logout();
    ctx.page.redirect('/')

    return res
}