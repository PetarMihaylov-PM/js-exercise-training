import { page } from './lib.js';
import { addRender } from './utils/render.js';
import { renderCreate } from './views/create.js';
import { renderDashboard } from './views/dashboard.js';
import { renderDetails } from './views/details.js';
import { renderEdit } from './views/edit.js';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderLogout } from './views/logout.js';
import { renderNavbar } from './views/navbar.js';
import { renderRegister } from './views/register.js';
import { renderSearch } from './views/search.js';

page(addRender);
renderNavbar();

//TODO Bind URLS 

page('/', renderHome);
page('/login', renderLogin);
page('/logout', renderLogout);
page('/register', renderRegister);
page('/dashboard', renderDashboard);
page('/dashboard/:id', renderDetails);
page('/create', renderCreate);
page('/edit/:id', renderEdit);
page('/search', renderSearch);


page.start();