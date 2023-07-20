import { render } from '../../node_modules/lit-html/lit-html.js';

let main = document.querySelector('main')

function ctxRender(context, root = main) {
    render(context, root)
}

export function decorateContext(ctx, next) {
    ctx.render = ctxRender
    next()
}
