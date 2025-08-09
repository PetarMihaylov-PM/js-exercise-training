import { html } from "../lib.js"

const homeTemp = () => html`
  <section id="home">
    <img src="./images/home.webp" alt="home" />
    <p>Welcome to MindNest - your safe haven for mental wellness and mindfulness. Discover expert tips, guided
      meditations, and a supportive community sharing insights to help you find calm, balance, and inner peace every
      day. Join us and nurture your mind with care.</p>
  </section>
`


export function homeView(ctx) {
  ctx.render(homeTemp());
}