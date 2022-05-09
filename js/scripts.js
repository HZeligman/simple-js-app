let pokemonRepository = (function () {
  let pokemonList= [
    { name: 'Eevee', height: 0.3, weight: 6.5, type: ['normal'] },
    { name: 'Quilava', height: 0.9, weight: 19, type: ['fire'], },
    { name: 'Charizard', height: 1.7, weight: 90.5, type: ['fire', 'flying'] },
  ]

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function(pokemon) {
      return pokemonList;
    }
  };
})();

pokemonRepository.add({name: 'Marill', height: 0.4, weight: 8.5, type: ['fairy', 'water']});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >1){
    document.write("<p>" + pokemon.name + "(height: " + pokemon.height + ") Wow he's tall!" + "</p>");
  } else {
    document.write("<p>" + pokemon.name + "(height: " + pokemon.height + ")</p>");
  }
});
