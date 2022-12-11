import { getUser } from "./api/auth.js";
import { html,render } from "./lib.js";




const root = document.querySelector('main');
const notifications = document.querySelector('.notification')



export function decoratorCtx(ctx,next) {
    ctx.renderError = (error) => {
        notifications.style.display = 'block';
        notifications.querySelector('span').textContent = error;
        setTimeout(() => notifications.style.display = 'none', 3000)
    }
    ctx.render = function(section) {
        render(section,root)
    }
    next()
}
