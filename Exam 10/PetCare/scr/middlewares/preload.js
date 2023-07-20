import * as repo from "../repos/dataRepo.js";
import * as donationRepo from "../repos/donationRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;

    if (ctx.isAuthenticated) {
        const [item, totalDonationsCount, userDonationsCount] =
            await Promise.all([
                repo.getById(id),
                donationRepo.getTotalDonationCount(id),
                donationRepo.getDonationCountByUser(id, ctx.user._id)]);
        item.donations = totalDonationsCount * 100;
        ctx.item = item;
        ctx.user.didDonation = userDonationsCount > 0;
    } else {
        ctx.item = await repo.getById(id);
    }

    if (ctx.user && ctx.user._id === ctx.item._ownerId) {
        ctx.item._isOwner = true;
    }

    next();
}
