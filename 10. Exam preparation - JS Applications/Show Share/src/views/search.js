import { searchShow } from "../data/data.js";
import { html } from "../lib.js";

const searchTemp = (onSearch, result) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form" @submit=${onSearch}>
        <input
          type="text"
          name="search"
          id="search-input"
        />
        <button class="button-list">Search</button>
      </form>
    </div>
    <h4>Results:</h4>
      <div class="search-result">
      

      <!--If there are matches display a div with information about every show-->

      ${result === undefined
        ? null
        : result.length === 0
          ? html`<p class="no-result">There is no TV show with this title</p>`
          : result.map(show => html`
              <div class="show">
                <img src=${show.imageUrl} />
                <div class="show">
                  <h3 class="title">${show.title}</h3>
                  <p class="genre">Genre: ${show.genre}</p>
                  <p class="country-of-origin">Country of Origin: ${show.country}</p>
                  <a class="details-btn" href="/dashboard/${show._id}">Details</a>
                </div>
              </div>
            `)
      }
      
      </div>
  </section>
`;


export function renderSearch(ctx){
  let result;
  ctx.render(searchTemp(onSearch, result));

  

  async function onSearch(e){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const search = formData.get('search');

    try {
      if(!search){
        throw new Error('Please fill the search box');
      }

      result = await searchShow(search);
      ctx.render(searchTemp(onSearch, result));

    } catch (error) {
      alert(error.message);
    }
  }
}