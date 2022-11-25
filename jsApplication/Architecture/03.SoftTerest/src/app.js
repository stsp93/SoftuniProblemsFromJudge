import { showCreate } from "./views/createPage.js";
import { showDashboard } from "./views/dashboard.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showHome } from "./views/homePage.js";
import { initialize } from "./router.js";
import { showDetails } from "./views/detailsPage.js";
import { logout } from "./api/user.js";

const viewsDiv = document.getElementById('views');
viewsDiv.remove()

const views = {
    '/': showHome,
    '/register': showRegister,
    '/dashboard':showDashboard,
    '/create': showCreate,
    '/login':showLogin,
    '/details':showDetails,
    '/logout':onlogout,
}



const router = initialize(views);
router.goTo('/')
router.updateNav();

function onlogout() {
    logout();
    router.goTo('/');
}

