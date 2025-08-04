import { page } from './lib.js';
import { addRender } from './utils/render.js';
import { homeView } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { logout } from './data/user.js';
import { updateNav } from './utils/utils.js';
import { renderCatalog } from './views/catalog.js';

updateNav();

document.getElementById('logoutBtn').addEventListener('click', () => {
  logout();
  updateNav();
  page.redirect('/');
});

page(addRender);
//TODO Bind URLS 

page('/', homeView);
page('/login', renderLogin);
page('/register', renderRegister);
page('/catalog', renderCatalog);

page.start();