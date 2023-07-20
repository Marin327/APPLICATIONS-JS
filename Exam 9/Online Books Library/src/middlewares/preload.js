import * as booksRepo from "../repos/dataRepo.js";
import * as likesRepo from "../repos/likesRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

    const [item, likesCount, likesByUser] = await Promise.all([
        booksRepo.getById(id),
        likesRepo.getLikesForBook(id),
        likesRepo.getLikesForBookByUser(id, ctx.user?._id)
    ]);

    item.likesCount = likesCount;
    ctx.item = item;
    if (ctx.user) {
        ctx.user.didLike = likesByUser > 0;
    }

    if (ctx.user && ctx.user?._id === ctx.item._ownerId) {
        ctx.item._isOwner = true;
    }

    next();
}
