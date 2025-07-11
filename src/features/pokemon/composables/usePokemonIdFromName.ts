export function usePokemonIdFromName(name: string): number {
  let hash: number = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const maxPokemonId: number = 1010;
  return (Math.abs(hash) % maxPokemonId) + 1;
}
