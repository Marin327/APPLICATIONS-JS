import * as repo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

    if (ctx.isAuthenticated) {
        const [item, likesCount, userLikesCount] =
            await Promise.all([repo.getById(id),
                likesRepo.totalLikesByTheater(id),
                likesRepo.totalLikesByTheaterAndUser(id, ctx.user._id)]);
        if (ctx.user._id === item._ownerId) {
            item._isOwner = true;
        }
        item.likesCount = likesCount;

        ctx.item = item;
        ctx.user.didLike = userLikesCount > 0;

    } else {
        ctx.item = await repo.getById(id);
    }

    next();
}
