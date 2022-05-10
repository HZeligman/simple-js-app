let pokemonRepository = (function () {
  let repository= [
    { name: 'Eevee', height: 0.3, weight: 6.5, type: ['normal'] },
    { name: 'Quilava', height: 0.9, weight: 19, type: ['fire'], },
    { name: 'Charizard', height: 1.7, weight: 90.5, type: ['fire', 'flying'] },
  ]

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "weight" in pokemon &&
      "type" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("Incorrect Format");
    }
  }
  function getAll(pokemon) {
    return repository;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    addEvent(button, pokemon);
  }
  function addEvent(button, pokemon) {
    button.addEventListener ('click', function (pokemon) {
      onclick = console.log (button.innerText);
    });
  }
  function showDetails(pokemon) {
    return repository;
  }

  return {
     add: add,
     getAll: getAll,
     addListItem: addListItem,
     showDetails: showDetails
   };
})();

pokemonRepository.add({name: 'Marill', height: 0.4, weight: 8.5, type: ['fairy', 'water']});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

console.log(pokemonRepository.showDetails());
