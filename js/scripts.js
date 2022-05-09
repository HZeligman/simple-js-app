let pokemonList= [
  { name: 'Eevee', height: 0.3, weight: 6.5, type: ['normal'] },
  { name: 'Quilava', height: 0.9, weight: 19, type: ['fire'], },
  { name: 'Charizard', height: 1.7, weight: 90.5, type: ['fire', 'flying'] },
]

function printArrayDetails(list){
  for (let i = 0; i < list.length; i++) {
    if (pokemonList[i].height >1){
      document.write("<p>" + pokemonList[i].name + "(height: " + pokemonList[i].height + ") Wow he's tall!" + "</p>");
    } else {
      document.write("<p>" + pokemonList[i].name + "(height: " + pokemonList[i].height + ")</p>");
    }
  }
}
printArrayDetails(pokemonList);
