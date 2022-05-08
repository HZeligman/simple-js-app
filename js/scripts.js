let pokemonList= [
  {
    name: 'Eevee',
    height: 0.3,
    weight: 6.5,
    type: ['normal'],
  },
  {
    name: 'Quilava',
    height: 0.9,
    weight: 19,
    type: ['fire'],
  },
  {
    name: 'Charizard',
    height: 1.7,
    weight: 90.5,
    type: ['fire', 'flying'],
  },
]

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >1){
    document.write(pokemonList[i].name + "(height: pokemonList[i].height)" + "Wow he's tall!");
  } else {
    document.write(pokemonList[i].name + "(height: pokemonList[i].height)");
  }
}
