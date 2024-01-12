import page from '../node_modules/page/page.mjs';
import {logout} from "./api/users.js";
import {updateNav} from "./middlevares/navbar.js";
import {preload} from "./middlevares/preload.js";
import {parseQueryString} from "./middlevares/query_string.js";
import {decorateContext} from "./middlevares/render.js";
import {addSession} from "./middlevares/session.js";
import {createPage} from "./views/create.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {homePage} from "./views/home.js";
import {loginPage} from "./views/login.js";
import {memesPage} from "./views/memes.js";
import {profilePage} from "./views/profile.js";
import {registerPage} from "./views/register.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homePage);
page('/memes', memesPage);
page('/memes/:id', preload,detailsPage);
page('/create', createPage);
page('/edit/:id', preload, editPage);
page('/profile', profilePage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout() {
    logout();
    page.redirect('/');
}
