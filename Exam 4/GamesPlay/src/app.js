import page from '../node_modules/page/page.mjs';
import {logout} from "./api/users.js";
import {updateNav} from "./middlewares/navbar.js";
import {preload} from "./middlewares/preload.js";
import {parseQueryString} from "./middlewares/query_string.js";
import {decorateContext} from "./middlewares/render.js";
import {addSession} from "./middlewares/session.js";
import {catalogView} from "./views/catalog.js";
import {createView} from "./views/create.js";
import {detailView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {homeView} from "./views/home.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/catalog/:id', preload,detailView);
page('/edit/:id', preload,editView);
page('/login', loginView);
page('/register', registerView);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout() {
    logout();
    page.redirect('/');
}
