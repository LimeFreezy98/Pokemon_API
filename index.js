async function fetchPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    return data.results; // list of pokemon { name, url }
}

async function fetchPokemonDetails(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return await response.json();
}

async function displayPokemon() {
    const pokemonList = document.getElementById("pokemon-list");
    const pokemons = await fetchPokemon();

    pokemons.forEach(pokemon => {
        const li = document.createElement("li");
        li.textContent = pokemon.name;

        // Add click event
        li.addEventListener("click", async () => {
            const details = await fetchPokemonDetails(pokemon.name);
            
            const detailsDiv = document.getElementById("pokemon-details");
            detailsDiv.innerHTML = `
                <h3>${details.name.toUpperCase()}</h3>
                <img src="${details.sprites.front_default}" alt="${details.name}">
            `;
        });

        pokemonList.appendChild(li);
    });
}

displayPokemon();