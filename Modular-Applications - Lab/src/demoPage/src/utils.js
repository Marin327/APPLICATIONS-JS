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

export function userSession(userDataProvider, ctx, next){
    ctx.userData = userDataProvider();
    next();
}

export function createSubmitHandler(callback){
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        callback(data, event.target);
    }
}
