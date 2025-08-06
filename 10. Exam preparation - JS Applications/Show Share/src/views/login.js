import { login } from "../data/user.js";
import { html } from "../lib.js";
import { renderNavbar } from "./navbar.js";

const loginTemp = (onLogin) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onLogin}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="#">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;


export function renderLogin(ctx) {
  ctx.render(loginTemp(onLogin));

  async function onLogin(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    const { email, password } = data;

    

    try {

      if(!email || !password){
        throw new Error('Please enter email and password');
      }

      await login(email, password);

      renderNavbar();

      ctx.page.redirect('/');

    } catch (error) {
      alert(error.message);
    }
  }
}
