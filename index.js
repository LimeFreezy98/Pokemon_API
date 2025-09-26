async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    return data.results;
}

async function displayPokemon() {
    const pokemonList = document.getElementById("pokemon-list");
    const pokemons = await fetchPokemon();

    pokemons.forEach(pokemon => {
        const li = document.createElement("li");
        li.textContent = pokemon.name
        pokemonList.appendChild(li);
    })
}



displayPokemon();