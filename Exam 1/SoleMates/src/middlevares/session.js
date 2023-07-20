import {getUserData, isAuthenticated} from "../api/users_store.js";

export function addSession(ctx, next) {
    ctx.user = getUserData();
    ctx.isAuthenticated = isAuthenticated();
    next();
}
