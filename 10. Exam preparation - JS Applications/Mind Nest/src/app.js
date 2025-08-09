import { page } from './lib.js';
import { addRender } from './utils/render.js';
import { renderCreate } from './views/create.js';
import { renderDashboard } from './views/dashboard.js';
import { renderDetails } from './views/details.js';
import { renderEdit } from './views/edit.js';
import { homeView } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderLogout } from './views/logout.js';
import { renderNavbar } from './views/navBar.js';
import { renderRegister } from './views/register.js';

page(addRender);
renderNavbar();


//TODO Bind URLS 

page('/', homeView);
page('/login', renderLogin);
page('/logout', renderLogout);
page('/register', renderRegister);
page('/dashboard', renderDashboard);
page('/dashboard/:id', renderDetails);
page('/create', renderCreate);
page('/edit/:id', renderEdit);

page.start();