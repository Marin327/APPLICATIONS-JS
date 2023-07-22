import {logout} from "../api/user.js";

export function logoutPage(ctx) {
    logout();
    ctx.page.redirect('/');
}
