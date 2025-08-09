import { html, render } from "../lib.js";
import { getUserData } from "../utils/utils.js";

const navbarTemplate = (hasUser) => html`
  <div>
    <a href="/dashboard">Mindful Tips</a>
  </div>

  ${hasUser ? 
    html`
    <!-- Logged-in users -->
      <div class="user">
        <a href="/create">Share Your Tip</a>
        <a href="/logout">Logout</a>
      </div>
    `
    :
    html`
    <!-- Guest users -->
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`
    }
`;

const navRoot = document.querySelector('nav');

export const renderNavbar = () => {

  const hasUser = getUserData();

  render(navbarTemplate(hasUser),navRoot);
}