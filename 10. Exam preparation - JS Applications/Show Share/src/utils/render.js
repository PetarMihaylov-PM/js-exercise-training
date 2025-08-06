import { render } from "../lib.js";


//TODO use root element from project
const root = document.querySelector('main');

export function addRender (ctx, next) { 

  ctx.render = (tempResult) => render(tempResult, root);

  next();
}