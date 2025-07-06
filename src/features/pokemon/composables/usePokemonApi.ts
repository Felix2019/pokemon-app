import type { Pokemon } from "../interfaces/Pokemon";

export const usePokemonApi = () => {
  const getPokemon = async (pokemonId: number): Promise<Pokemon> => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon with ID ${pokemonId}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        height: data.height.toString(),
        weight: data.weight.toString(),
        abilities: data.abilities.map(
          (entry: { ability: { name: string } }) => entry.ability.name
        ),
        sprites: {
          front_default: data.sprites.front_default,
          back_default: data.sprites.back_default,
        },
      };
    } catch (error) {
      throw new Error(`Pokemon API Error: ${(error as Error).message}`);
    }
  };

  return { getPokemon };
};
