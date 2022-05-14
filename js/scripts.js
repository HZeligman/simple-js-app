let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonKeys= ['name', 'detailsUrl', 'imageUrl', 'height', 'types'];
  let buttonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if ((typeof item === 'object') && (Object.keys(item).every((element, i) => element === pokemonKeys[i]))) {
      pokemonList.push(item);
    }
  }

  function findPokemon(name) {
    let givenPokemon = pokemonList.filter(element => element.name === name);

    if (givenPokemon.length === 1) {
      return givenPokemon[0];
    } else if (givenPokemon.length > 1) {
      return givenPokemon;
    }
  }

  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let buttonItem = document.createElement('button');
    buttonItem.innerText = pokemon.name;
    buttonItem.classList.add('list-button');
    listItem.appendChild(buttonItem);
    buttonList.appendChild(listItem);
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
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h2');
    titleElement.innerText = pokemon.name;

    let typesString = '';
    pokemon.types.forEach(function (type, i) {
      if (i < pokemon.types.length - 1) {
        typesString += `${type.type.name},`
      } else {
        typesString += `${type.type.name}`
      }
    });

    let contentElement = document.createElement('p');
    contentElement.innerHTML = `height: ${pokemon.height}<br>Types: ${typesString}`;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
