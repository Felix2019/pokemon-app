export interface Pokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: string[];
  sprites: {
    front_default: string;
    back_default: string;
  };
}
