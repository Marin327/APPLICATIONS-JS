import * as applicationService from "../repos/applicationsRepo.js";
import * as repo from "../repos/dataRepo.js";

export async function preload(ctx, next) {
    const id = ctx.params.id;
        const [item, count, userApplied] = await Promise.all([repo.getById(id), applicationService.getCountByOfferId(id), applicationService.didUserApplied(id, ctx.user._id)]);
        ctx.item = item;
        ctx.item.applicationsCount = count;
        ctx.item.userApplied = userApplied > 0;
        if (ctx.user && ctx.user._id === item._ownerId) {
            item._isOwner = true;
        }

    next();
}
