import * as shoesRepo from "../repos/shoes.js";


export async function preload(ctx, next) {
    const shoesId = ctx.params.id;

        const shoes = await shoesRepo.getById(shoesId);
        ctx.shoes = shoes;

        if (ctx.user && ctx.user._id === shoes._ownerId) {
            shoes._isOwner = true;
        }

    next();
}
