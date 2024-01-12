import {getUserData} from "../api/users_store.js";

export function addSession(ctx, next) {
    ctx.user = getUserData()
    next()
}
