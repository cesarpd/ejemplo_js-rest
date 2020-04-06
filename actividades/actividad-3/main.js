// On load Init
window.addEventListener('load', init())

// Init function
function init() {
  console.debug('Documennt loaded...')
  getPokemonList();

}
// Click Event
let pokemonClick = (e) => {
  let id = 0;
  let item = e.target;
  if (item.children[0]) {
    id = item.children[0].innerText;
    
  } else {
    id = item.innerText;
    console.debug(id);
  }
  getPokemonData(id);
}

// GET Pokemon List
function getPokemonList() {
  
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {

    let eList = document.getElementById('poke-list');

    if (this.readyState == 4 && this.status == 200) {
      //console.info('GET LIST: ' + url);

      const jsonRes = JSON.parse(this.responseText);
      //console.debug(jsonRes);      
      const pokemons = jsonRes.results;
      //console.debug(pokemons);

      eList.innerHTML = '';

      for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        let pokemonUrl = pokemon.url;
        let pokemonId = pokemonUrl.substring(pokemonUrl.lastIndexOf('/')-1);
        //console.debug(pokemonId);
        
        eList.innerHTML +=
          ` <div class="d-flex flex-column poke-item">
                <p class="pt-1 pb-4"><strong>${pokemon.name}</strong>
                ${pokemon.name}</p>
            </div>`;
      }

      let pokeListItems = document.querySelectorAll('.poke-item');

      for (let pokeListItem of pokeListItems) {
        pokeListItem.addEventListener('click', pokemonClick)
      }
    }
  }
  //Peticion GET
  xhr.open('GET', url, true);
  xhr.send();
}

// GET Detalle Pokemon
let getPokemonData = (id) => {

  let urlId = `https://pokeapi.co/api/v2/pokemon/${id}`

  //let eDetail = document.getElementById('poke-detail');
  let eName = document.getElementById('poke-name');
  let eSize = document.getElementById('poke-size');
  let eExp = document.getElementById('poke-exp');
  let eFrontImage = document.getElementById('poke-front-image');

  let eTypes = document.getElementById('poke-type');

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      console.info('GET ITEM: ' + urlId);

      const idJsonRes = JSON.parse(this.responseText);
      let pokemonDetails = idJsonRes;

      eName.innerText = pokemonDetails.name;
      eSize.innerText = `${Math.round((pokemonDetails.weight / Math.sqrt(pokemonDetails.height) * 100) / 100)} IMC`;
      eExp.innerText = pokemonDetails.base_experience;
      eFrontImage.src = pokemonDetails.sprites.front_default || '';

      for (let i = 0; i < pokemonDetails.types.length; i++) {
        //console.log(pokemonDetails.types[i].type.name);
        if (pokemonDetails.types[1]) {
          eTypes.innerHTML = `
              <span class="badge badge-pill badge-dark py-2 px-3">
                ${pokemonDetails.types[0].type.name}
              </span>
              <span class="badge badge-pill badge-dark py-2 px-3">
                ${pokemonDetails.types[1].type.name}
              </span>
            `;
        } else {
          eTypes.innerHTML = `
              <span class="badge badge-pill badge-dark py-2 px-3">
                ${pokemonDetails.types[0].type.name}
              </span>
            `;
        }
      }
    }
  }
  xhr.open('GET', urlId, true);
  xhr.send();
}