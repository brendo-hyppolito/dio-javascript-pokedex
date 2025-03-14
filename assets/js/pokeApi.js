const pokeApi = {}

function convertPokeApiToPokemon (pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

    pokemon.height = (pokemonDetails.height)*10
    pokemon.weight = (pokemonDetails.weight)/10

    const abilities = pokemonDetails.abilities.map((ability) => ability.ability.name);
    pokemon.abilities = abilities.map(ability => `<span>${ability}</span>`).join('');

    pokemonDetails.stats.forEach(stat => {
        const statName = stat.stat.name;
        const baseStat = stat.base_stat;

        if (pokemon.hasOwnProperty(statName)) {
            pokemon[statName] = baseStat;
        }
        else {
            switch(statName) {
                case "special-attack":
                    pokemon.specialAttack = baseStat;
                    break;
                case "special-defense":
                    pokemon.specialDefense = baseStat;
                    break;
            }
        }
    })
  
    console.log(pokemon)
    return pokemon
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)


        .catch((error) => console.error(error))
}
