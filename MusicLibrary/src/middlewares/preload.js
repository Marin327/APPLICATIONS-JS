import * as repo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

    if (ctx.isAuthenticated){
        const [item, likesCount, likesPerUser] = await Promise.all([repo.getById(id), likesRepo.getLikes(id), likesRepo.getLikesPerUser(id, ctx.user._id)]); ;
        ctx.item = item;
        ctx.item.likesCount = likesCount;
        ctx.user.didLike = likesPerUser > 0;

        if (ctx.user && ctx.user._id === item._ownerId) {
            item._isOwner = true;
        }
    } else {
        ctx.item = await repo.getById(id);
        ctx.item._isOwner = false;
    }

    next();
}
