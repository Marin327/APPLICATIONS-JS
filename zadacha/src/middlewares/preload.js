import * as repo from "../repos/dataRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

        const item = await repo.getById(id);
        ctx.item = item;

        if (ctx.user && ctx.user._id === item._ownerId) {
            item._isOwner = true;
        }

    next();
}
