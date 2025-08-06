import { page } from './lib.js';
import { addRender } from './utils/render.js';
import {  renderHome } from './views/home.js';
import { renderNavbar } from './views/navbar.js';

page(addRender);
renderNavbar();

//TODO Bind URLS 

page('/', renderHome);

page.start();