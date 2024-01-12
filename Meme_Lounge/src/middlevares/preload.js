import * as memeService from "../repos/memes.js";


export async function preload(ctx, next) {
    const memeId = ctx.params.id;

        const meme = await memeService.getById(memeId);
        ctx.meme = meme;

        if (ctx.user && ctx.user._id === meme._ownerId) {
            meme._isOwner = true;
        }

    next();
}
