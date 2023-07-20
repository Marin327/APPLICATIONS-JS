import * as repo from "../repos/dataRepo.js";
import * as commentsRepo from "../repos/commentsRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

        const [item, comments] = await Promise.all([ repo.getById(id), commentsRepo.getComments(id)]);
        item.comments = comments;
        ctx.item = item;

        if (ctx.user && ctx.user._id === item._ownerId) {
            item._isOwner = true;
        }

    next();
}
