import {page, render} from './lib.js';
import {getUserData} from './util.js'
import { showCatalog } from './views/catalogView.js';
import { showCreate } from './views/createView.js';
import { showDetails } from './views/detailsView.js';
import { showEdit } from './views/editView.js';
import { showHome } from './views/homeView.js';
import { showLogin } from './views/loginView.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/registerView.js';


const main=document.getElementById('main-content') 

page(decorateContext);

page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id',showDetails);
page('/edit/:id', showEdit);
// page('/search', () => console.log('editView')); това може да си ги използвам първоначално и в последствие да променям

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user) {
        ctx.user = user;
    }
    next();
}

function renderMain(content) {
    render(content, main)
}