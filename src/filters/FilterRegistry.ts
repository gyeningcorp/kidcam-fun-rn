import { FilterDefinition } from './FilterDefinition';
import { CatFilter } from './renderers/CatFilter';
import { DogFilter } from './renderers/DogFilter';
import { DinoFilter } from './renderers/DinoFilter';
import { PrincessFilter } from './renderers/PrincessFilter';
import { SuperheroFilter } from './renderers/SuperheroFilter';
import { PirateFilter } from './renderers/PirateFilter';
import { SpaceFilter } from './renderers/SpaceFilter';
import { MonsterFilter } from './renderers/MonsterFilter';
import { RainbowFilter } from './renderers/RainbowFilter';
import { SnowFilter } from './renderers/SnowFilter';

export const filters: FilterDefinition[] = [
  { id: 'cat', name: 'Cat', emoji: '🐱', category: 'animals', renderer: CatFilter },
  { id: 'dog', name: 'Dog', emoji: '🐶', category: 'animals', renderer: DogFilter },
  { id: 'dino', name: 'Dino', emoji: '🦕', category: 'animals', renderer: DinoFilter },
  { id: 'princess', name: 'Princess', emoji: '👑', category: 'magic', renderer: PrincessFilter },
  { id: 'superhero', name: 'Superhero', emoji: '🦸', category: 'magic', renderer: SuperheroFilter },
  { id: 'pirate', name: 'Pirate', emoji: '🏴‍☠️', category: 'silly', renderer: PirateFilter },
  { id: 'space', name: 'Space', emoji: '🚀', category: 'magic', renderer: SpaceFilter },
  { id: 'monster', name: 'Monster', emoji: '👾', category: 'silly', renderer: MonsterFilter },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈', category: 'magic', renderer: RainbowFilter },
  { id: 'snow', name: 'Snow', emoji: '❄️', category: 'seasonal', renderer: SnowFilter },
];
