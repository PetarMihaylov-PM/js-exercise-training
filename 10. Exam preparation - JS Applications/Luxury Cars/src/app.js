import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";


import { getUserData } from "./util.js";
import { logout } from "./api/users.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { homePage } from "./views/home.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

const main = document.getElementById("main-element");
document.getElementById("btnLogout").addEventListener("click", onLogout);

page(decorateContext);
page("index.html", "/");
page("/", homePage);

page('/login', loginPage);
page("/register", registerPage);

page("/catalog", catalogPage);
page("/create", createPage);
page("/details/:id", detailsPage);
page("/edit/:id", editPage);
page("/search", searchPage);




updateNav();
page.start();


function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.updateNav = updateNav;

  const userData = getUserData();
  if (userData) {
    ctx.userData = userData;
  }

  next();
}

function updateNav() {
  const userData = getUserData();

  if (userData) {
    document.querySelector(".user").style.display = "block";
    document.querySelector(".guest").style.display = "none";

  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "block";
  }
}

function onLogout() {
  logout();

  updateNav();
  page.redirect("/");
}