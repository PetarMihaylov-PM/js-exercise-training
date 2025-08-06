import { logout } from "../data/user.js";
import { renderNavbar } from "./navbar.js";


export function renderLogout(ctx) {
  logout();
  renderNavbar();
  ctx.page.redirect('/');
}