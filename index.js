
let pokemons = [];
let currentIndex = 0;

async function fetchPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    return data.results; // [{name, url}, ...]
}

async function fetchPokemonDetails(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return await response.json();
}

async function showPokemon(index) {
    if (index < 0 || index >= pokemons.length) return; // prevent out-of-bounds

    const pokemon = pokemons[index];
    const details = await fetchPokemonDetails(pokemon.name);

    const detailsDiv = document.getElementById("pokemon-details");
    detailsDiv.innerHTML = `
        <h2>${details.name.toUpperCase()}</h2>
        <img src="${details.sprites.front_default}" alt="${details.name}">
    `;
}

async function init() {
    pokemons = await fetchPokemonList();
    showPokemon(currentIndex);

    document.getElementById("next-btn").addEventListener("click", () => {
        if (currentIndex < pokemons.length - 1) {
            currentIndex++;
            showPokemon(currentIndex);
        }
    });

    document.getElementById("prev-btn").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showPokemon(currentIndex);
        }
    });
}

init();