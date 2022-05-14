let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonKeys= ['name', 'detailsUrl', 'imageUrl', 'height', 'types'];
  let buttonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    //if ((typeof item === 'object') && (Object.keys(item).every((element, i) => element === pokemonKeys[i]))) {
    pokemonList.push(pokemon);
    //}
  }

  //function findPokemon(name) {
    //let givenPokemon = pokemonList.filter(element => element.name === name);

    //if (givenPokemon.length === 1) {
      //return givenPokemon[0];
    //} else if (givenPokemon.length > 1) {
      //return givenPokemon;
    //}
  //}

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-pokemon-list');
    let buttonItem = document.createElement('button');
    buttonItem.innerText = pokemon.name;
    buttonItem.classList.add('list-button');
    buttonItem.setAttribute('data-toggle', 'modal');
    buttonItem.setAttribute('data-target', '#pokemonModal');
    listItem.append(buttonItem);
    list.append(listItem);
    buttonItem.addEventListener('click', () => showDetails(pokemon));
  }

  function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  //modal
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let pokemonName = $('<h2>' + pokemon.name + '</h2>');
    let pokemonHeight = $('<p>' + "height: " + pokemon.height + '</p>');
    let imageElement = $('<img class=\'pokemon-modal-image\'>');
    imageElement.attr("src", pokemon.imageUrl);
    let typeElement = document.createElement('p');
    pokemon.types.forEach((type, index) => {
      if (index === pokemon.types.length - 1) {
        typeElement.innerText += type.type.name;
      } else {
        typeElement.innerText += type.type.name + ", ";
      }
    })

    modalTitle.empty();
    modalBody.empty();
    modalTitle.append(pokemonName);
    modalBody.append(imageElement);
    modalBody.append(pokemonHeight);
    modalBody.append(typeElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();

pokemonRepository.loadList (). then(function() {
  pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));

  });
