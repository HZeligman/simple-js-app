let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }


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

  function loadDetails (item) {
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
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    let titleElement = document.createElement('h1');
    titleElement.innerText = 'name: ' + pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let typeElement = document.createElement('p');
    pokemon.types.forEach((type, index) => {
      if (index === pokemon.types.length - 1) {
        typeElement.innerText += type.type.name;
      } else {
        typeElement.innerText += type.type.name + ',';
      }
    })

    modalTitle.append(titleElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
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
