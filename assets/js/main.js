document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const searchInput = document.getElementById('searchInput');
    const clearSearchInputButton = document.getElementById('clearSearchInputButton');

    if (searchInput && clearSearchInputButton) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.trim();
            filterPokemonList(searchTerm);
        });

        clearSearchInputButton.addEventListener('click', () => {
            searchInput.value = '';
            filterPokemonList('');
        });
    } else {
        console.error('Elementos searchInput ou clearSearchInputButton não encontrados');
    }

    loadPokemonList();
});

const pokemonList = document.getElementById('pokemonList')

const maxRecords = 386;
const limit = maxRecords;
let offset = parseInt(sessionStorage.getItem("pokemonOffset")) || 0;

function loadPokemonList() {
    const storedPokemon = sessionStorage.getItem("pokemonData");

    if (storedPokemon) {
        const pokemons = JSON.parse(storedPokemon);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    } 
    
    else {
        pokemonList.innerHTML = '<div class="loading">Loading Pokemons...</div>';
        loadPokemonItens(offset, limit).then(() => {
            window.location.reload();
        });
    }
}

function convertPokemonToLi(pokemon) {
    const pokemonNumber = String(pokemon.number).padStart(3, '0');
    return `
        <a href="pokemonDetailsPage.html?id=${pokemon.name}">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemonNumber}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `
}

function loadPokemonItens(offset, limit) {
    return pokeApi.getPokemons(offset, limit).then((newPokemons = []) => {
        const storedPokemon = sessionStorage.getItem("pokemonData");
        let allPokemons = [];

        if (storedPokemon) {
            allPokemons = JSON.parse(storedPokemon);
        }

        allPokemons = [...allPokemons, ...newPokemons];
        sessionStorage.setItem("pokemonData", JSON.stringify(allPokemons));

        const newHtml = allPokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    });
}

const isPageReloaded = sessionStorage.getItem("isPageReloaded");

function filterPokemonList(searchInput) {
    const storedPokemon = sessionStorage.getItem("pokemonData");
    if (!storedPokemon) return;

    const pokemons = JSON.parse(storedPokemon);
    const filteredPokemons = pokemons.filter(pokemon => {
        return  pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                pokemon.number.toString().includes(searchInput);
    });

    const pokemonList = document.getElementById('pokemonList');
    if (filteredPokemons.length > 0) {
        const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    }
    else {
        pokemonList.innerHTML = '<div class="noResults">No pokemons found.</div>';
    }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    filterPokemonList(searchTerm);
    console.log()
});

const clearSearchInputButton = document.getElementById('clearSearchInputButton');
clearSearchInputButton.addEventListener('click', () =>{
    searchInput.value = '';
    filterPokemonList('');
});
