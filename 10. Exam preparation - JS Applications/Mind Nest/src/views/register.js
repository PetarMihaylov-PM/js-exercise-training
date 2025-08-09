import { register } from "../data/user.js";
import { html } from "../lib.js";
import { showError } from "../utils/notification.js";
import { renderNavbar } from "./navBar.js";

const registerTemp = (onRegister) => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${onRegister}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;


export function renderRegister(ctx) {
  ctx.render(registerTemp(onRegister));


  async function onRegister(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');

    try {

      if(!email || !password || !rePassword || password !== rePassword) {
        throw new Error(`Passwords don't match`);
      }

      await register(email, password);
      
      renderNavbar();

      ctx.page.redirect('/')

    } catch (error) {
      showError(error.message);
    }
  }
}