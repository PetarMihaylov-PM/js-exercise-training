import { page } from './lib.js'
import { updateNav } from './utils/navBar.js';
import { addRender } from './utils/render.js'

import { homeView } from './views/home.js'

page(addRender);

//bind project URLs to view handlers
page('/', homeView);


page.start();

updateNav();