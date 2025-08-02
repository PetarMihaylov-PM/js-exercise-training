import { html, render } from "lit-html";
import { getUserData } from "./utils.js";

const navTemp = (hasUser) => html `
  <div>
    <a href="#">TV Shows</a>
    <a href="#">Search</a>
  </div>

  ${ hasUser ? userTemp() : guestTemp() }
`;

const navRoot = document.querySelector('nav');

const userTemp = () => html`
  <div class="user">
    <a href="#">Add Show</a>
    <a href="#">Logout</a>
  </div>
`;


const guestTemp = () => html`
  <div class="guest">
    <a href="#">Login</a>
    <a href="#">Register</a>
  </div>
`;

export function updateNav() {
  const userData = getUserData();

  render(navTemp(!!userData), navRoot);

}