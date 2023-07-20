import * as repo from "../repos/dataRepo.js";
import * as donationsRepo from "../repos/donationsRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

    if (ctx.isAuthenticated) {
        const [item, donationsCount, usersDonationCount] =
            await Promise.all([repo.getById(id), donationsRepo.donationsForPost(id), donationsRepo.usersDonationsForPost(id, ctx.user._id)]);
        item.donationsCount = donationsCount;
        item.madeDonation = usersDonationCount > 0;
        ctx.item = item;
    } else {
        ctx.item = await repo.getById(id);
    }

    if (ctx.user && ctx.user._id === ctx.item._ownerId) {
        ctx.item._isOwner = true;
    }

    next();
}
