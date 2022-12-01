import { page } from './lib.js'
import { decorateCtx, onLogout, showNav } from './middleware.js';
import { showHome } from './views/home.js';
import { showDashboard } from './views/dashboard.js';
import { showSearch } from './views/search.js';
import { showAddPair } from './views/addPair.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';


page(showNav);
page(decorateCtx)
page('/', showHome)
page('/dashboard', showDashboard)
page('/search', showSearch)
page('/addPair', showAddPair)
page('/details/:id', showDetails)
page('/edit/:id', showEdit)
page('/logout', onLogout)
page('/login', showLogin)
page('/register', showRegister)

page.start()