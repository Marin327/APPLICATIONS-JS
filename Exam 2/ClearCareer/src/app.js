import page from '../node_modules/page/page.mjs';
import {logout} from "./api/users.js";
import {updateNav} from "./middlewares/navbar.js";
import {preload} from "./middlewares/preload.js";
import {parseQueryString} from "./middlewares/query_string.js";
import {decorateContext} from "./middlewares/render.js";
import {addSession} from "./middlewares/session.js";
import {createOfferView} from "./views/create.js";
import {dashboardView} from "./views/dashboard.js";
import {detailsView} from "./views/details.js";
import {editOfferView} from "./views/edit.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homeView);
page('/dashboard', dashboardView);
page('/dashboard/:id', preload, detailsView);
page('/create', createOfferView);
page('/edit/:id', preload, editOfferView);
page('/login', loginView);
page('/register', registerView);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout() {
    logout();
    page.redirect('/');
}
