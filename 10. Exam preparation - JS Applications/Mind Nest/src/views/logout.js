import { logout } from "../data/user.js";
import { renderNavbar } from "./navBar.js";


export function renderLogout(ctx) {
  logout();
  renderNavbar();
  ctx.page.redirect('/');
}