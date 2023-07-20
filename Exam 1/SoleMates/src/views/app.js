import page from '../node_modules/page/page.mjs';
import {logout} from "./api/users.js";
import {updateNav} from "./middlevares/navbar.js";
import {preload} from "./middlevares/preload.js";
import {parseQueryString} from "./middlevares/query_string.js";
import {decorateContext} from "./middlevares/render.js";
import {addSession} from "./middlevares/session.js";
import {createView} from "./views/create.js";
import {dashboardView} from "./views/dashboard.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {searchView} from "./views/search.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homeView);
page('/dashboard', dashboardView);
page('/dashboard/:id', preload, detailsView);
page('/edit/:id', preload, editView);
page('/search', searchView);
page('/add', createView);
page('/login', loginView);
page('/register', registerView);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout() {
    logout();
    page.redirect('/dashboard');
}
