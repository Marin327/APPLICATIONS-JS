import page from '../node_modules/page/page.mjs';
import {logout} from "../../api/users.js";
import {updateNav} from "./middlewares/navbar.js";
import {preload} from "./middlewares/preload.js";
import {parseQueryString} from "./middlewares/query_string.js";
import {decorateContext} from "./middlewares/render.js";
import {addSession} from "./middlewares/session.js";
import {catalogView} from "./views/catalog.js";
import {createView} from "./views/createView.js";
import {detailsView} from "./views/detailsView.js";
import {editView} from "./views/editView.js";
import {homeView} from "./views/homeView.js";
import {loginView} from "./views/loginView.js";
import {registerView} from "./views/registerView.js";
import {searchView} from "./views/search.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/catalog/:id', preload, detailsView);
page('/edit/:id', preload, editView);
page('/login', loginView);
page('/register', registerView);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout(ev) {
	ev.preventDefault();
    logout();
    page.redirect('/');

    // Sample JavaScript code (assumes you have a function to check user authentication status)
function isUserLoggedIn() {
    // Implement logic to check if the user is logged in
    // Return true if logged in, false otherwise
}

// Sample JavaScript code (assumes you have a function to handle user logout)
function logout() {
    // Implement logic to log the user out
    // Redirect to the login page or perform any other necessary actions
}

// Sample JavaScript code (assumes you have a function to set up the navigation bar based on user status)
function setupNavBar() {
    const guestNav = document.getElementById('guestNav');
    const userNav = document.getElementById('userNav');

    if (isUserLoggedIn()) {
        guestNav.style.display = 'none';
        userNav.style.display = 'block';
    } else {
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
    }
}

// Call the setupNavBar function when the page loads to set up the initial state of the navigation bar
document.addEventListener('DOMContentLoaded', setupNavBar);
}
