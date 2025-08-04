import { page } from './lib.js';
import { addRender } from './utils/render.js';
import { homeView } from './views/home.js';

import * as api from './data/data.js'
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { logout } from './data/user.js';

document.getElementById('logoutBtn').addEventListener('click', () => {
  logout();
  page.redirect('/');
});

page(addRender);
//TODO Bind URLS 

page('/', homeView);
page('/login', renderLogin);
page('/register', renderRegister);

page.start();