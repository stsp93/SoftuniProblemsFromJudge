import { html } from "../lib.js"

const createTemplate = () => html``


export function showSearch(ctx, next) {
    ctx.render(createTemplate())
}