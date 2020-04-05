window.addEventListener('load', init())

function init() {
  console.debug('Documennt loaded...')
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=9';
  
  let eList = document.getElementById('poke-list');
  let eDetail = document.getElementById('poke-detail');
  
  let eName = document.getElementById('poke-name');
  let eSize = document.getElementById('poke-size');
  let eExp = document.getElementById('poke-exp');
  let eFrontImage = document.getElementById('poke-front-image'); 
  
  let eTypes = document.getElementById('poke-type');
  
  let pokemonClick = (e) => {
    let item = e.target;
    let id = item.children[0].innerText;
    //console.log(id)
    getPokemonData(id);
  }

  const xhr = new XMLHttpRequest();
  let getPokemonList = (getUrl) => {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        //console.info('GET LIST: ' + url);

        const jsonRes = JSON.parse(this.responseText);
        //console.debug(jsonRes);      
        const pokemons = jsonRes.results;
        //console.debug(pokemons);

        eList.innerHTML = '';


        for (let i = 0; i < pokemons.length; i++) {
          const pokemon = pokemons[i];

          eList.innerHTML += 
            ` <div class="d-flex flex-column">
                <p class="poke-item pt-1 pb-4"><strong>${i+1}</strong> ${pokemon.name}</p>
              </div>`;
        }

        let pokeListItems = document.querySelectorAll('.poke-item');
        
        for (let pokeListItem of pokeListItems) {
          pokeListItem.addEventListener('click', pokemonClick)
        }

      }
    }
  }

  //Peticion GET

  xhr.open('GET', url, true);
  xhr.send();

  // Ajax Request para los detalles del Pokemon
  let getPokemonData = (id) => {
    //console.log(id)
    let urlId = `https://pokeapi.co/api/v2/pokemon/${id}`
    
    xhr.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.info('GET ITEM: ' + urlId);
  
        const idJsonRes = JSON.parse(this.responseText);
        let pokemonDetails = idJsonRes;

        eName.innerText = pokemonDetails.name;
        eSize.innerText = `${Math.round((pokemonDetails.weight / Math.sqrt(pokemonDetails.height)*100)/100)} IMC`;
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

  getPokemonList(url)

}