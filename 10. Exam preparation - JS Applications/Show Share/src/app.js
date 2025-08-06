import { page } from './lib.js';
import { addRender } from './utils/render.js';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderLogout } from './views/logout.js';
import { renderNavbar } from './views/navbar.js';
import { renderRegister } from './views/register.js';

page(addRender);
renderNavbar();

//TODO Bind URLS 

page('/', renderHome);
page('/login', renderLogin);
page('/logout', renderLogout);
page('/register', renderRegister);

page.start();