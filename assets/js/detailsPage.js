const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('id');

const storedPokemon = sessionStorage.getItem("pokemonData");
const pokemons = JSON.parse(storedPokemon);


const pokemon = pokemons.find(p => p.name === pokemonName);

const showAbout = () => {
    const tableBody = document.getElementById('detailsTableBody');
    tableBody.innerHTML = pokemonToAboutTable(pokemon);
};

const showBaseStats = () => {
    const tableBody = document.getElementById('detailsTableBody');
    tableBody.innerHTML = pokemonToStatsTable(pokemon);
};

const showButtonToOficialSite = () => {
    const oficialSiteButton = document.getElementById('buttons');
    oficialSiteButton.innerHTML = pokemonToOficialSite(pokemon);
};

if (pokemon) {
    document.getElementById('pokemonName').textContent = pokemon.name;

    const header = document.getElementById('pokemonHeader');
    header.innerHTML = convertPokemonDetailsToHtml(pokemon);
    header.classList.add(pokemon.type);

    showAbout();
    showButtonToOficialSite();
} else {
    console.error("Pokémon não encontrado no sessionStorage.");
}

function convertPokemonDetailsToHtml(pokemon) {
    const pokemonNumber = String(pokemon.number).padStart(3, '0');

    return `
        <div class="pokemonDetails ${pokemon.type}">
            <h3 class="number">#${pokemonNumber}</h3>
            <h1 class="name">${pokemon.name}</h1>
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <figure class="image">
                <img src="${pokemon.photo}" alt="${pokemon.name}" loading="lazy">
            </figure>
        </div>
    `
}

function pokemonToAboutTable (pokemon){
    return `                
        <thead>
            <th class="highlight" onclick="showAbout()">About</th>
            <th onclick="showBaseStats()">Base Stats</th>
        </thead>

        <tbody>
            <tr style="height: .5rem;"></tr>
            <tr>
                <td>Height</td>
                <td>${pokemon.height} cm</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${pokemon.weight} kg</td>
            </tr>
            <tr class="abilities">
                <td>Abilities</td>
                <td class="abilities">${pokemon.abilities}</td>
            </tr>
        </tbody>
    `;
}

function pokemonToStatsTable (pokemon) {
    return `
        <thead>
            <th onclick="showAbout()">About</th>
            <th class="highlight" onclick="showBaseStats()">Base Stats</th>
        </thead>
        <tbody>
            <tr style="height: .5rem;"></tr>
            <tr>
                <div class="cellContent">
                    <td>HP</td>
                    <td>${pokemon.hp}</td>
                </div>
            </tr>
            <tr>
                <td>Attack</td>
                <td>${pokemon.attack}</td>
            </tr>
            <tr>
                <td>Defense</td>
                <td>${pokemon.defense}</td>
            </tr>
            <tr>
                <td>Special Attack</td>
                <td>${pokemon.specialAttack}</td>
            </tr>
            <tr>
                <td>Special Defense</td>
                <td>${pokemon.specialDefense}</td>
            </tr>
        </tbody>
    `
};

function pokemonToOficialSite (pokemon) {
    return `
    <a href="https://www.pokemon.com/br/pokedex/${pokemon.name}" target="_blank">
        <button class="detailsPageButtons" id="backToPokemonListButton" type="button">
            More Info
        </button>
    </a>
    <a href="index.html">
        <button class="detailsPageButtons" id="backToPokemonListButton" type="button">
            Return
        </button>
    </a>
    `
}






