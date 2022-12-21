import { getUser } from "./api/auth.js";
import { html,render } from "./lib.js";




const root = document.querySelector('main')



export function decoratorCtx(ctx,next) {
    ctx.render = function(section) {
        render(section,root)
    }
    next()
}
