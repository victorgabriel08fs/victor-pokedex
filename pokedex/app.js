async function fetchPokemon() {

    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = [];

    for (let i = 1; i <= 893; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    await Promise.all(pokemonPromises)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);
              
                let texto = '';
                if (pokemon.id < 100 && pokemon.id < 10) {
                    texto = '00' + pokemon.id;
                }
                if (pokemon.id < 100 && pokemon.id >= 10) {
                    texto = '0' + pokemon.id;
                }
                if (pokemon.id >= 100) {
                    texto = pokemon.id;
                }
                accumulator +=
                    `<a href="https://www.pokemon.com/br/pokedex/${pokemon.id}" target="_blank">
                    <li class="card ${types[0]}">
                        <div class="cont">
                            <img class="card-image " alt="${pokemon.name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${texto}.png"/>
                            <h2 class="card-title">Nº${pokemon.id} - ${pokemon.name}</h2>
                            <p class="card-subtitle">${types.join(' | ')}</p>
                        </div>
                    </li>
                </a> 
          `;
                return accumulator;
            }, '');



            const ul = document.querySelector('[data-js="pokedex"]');

            ul.innerHTML = lisPokemons;
        });

}

fetchPokemon();
