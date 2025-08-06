import { html, render } from "../lib.js";
import { getUserData } from "../utils/utils.js";


const navbarTemplate = (hasUser) => html`
  <div>
    <a href="#">TV Shows</a>
    <a href="#">Search</a>
  </div>

  ${hasUser ? 
    html`
      <div class="user">
        <a href="/create">Add Show</a>
        <a href="/logout">Logout</a>
      </div>
    ` 
    : 
    html`
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    `}
`;

const navRoot = document.querySelector('nav');

export const renderNavbar = () => {

  const hasUser = getUserData();

  render(navbarTemplate(hasUser),navRoot);
}