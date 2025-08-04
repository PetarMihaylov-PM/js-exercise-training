import { login } from "../data/user.js";
import { html } from "../lib.js";

const loginTemp = (onLogin) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onLogin}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`

export function renderLogin(ctx) {
  ctx.render(loginTemp(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    try{

    
      if(!email || !password){
        throw new Error('Please enter email and password');
      }

      await login(email, password);

      ctx.page.redirect('/');

    }catch (err){
      alert(err.message);
    }
  }

}