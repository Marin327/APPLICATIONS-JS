export function parseQueryString(ctx, next) {
    ctx.query = {};
    if (ctx.querystring) {
        ctx.query = Object.fromEntries(
            ctx.querystring
                .split('&')
                .map(p => p.split('='))
        );
    }

    next();
}
