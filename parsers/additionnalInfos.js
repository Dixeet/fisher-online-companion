export const excluded = [
  { id: '13', name: 'lead' },
  { id: '14', name: 'echo-sounder' },
  { id: '15', name: 'hand net' },
  { id: '16', name: 'Fish tank' },
  { id: '17', name: 'Headdress' },
  { id: '18', name: 'Signal' },
  { id: '19', name: 'Rodpod' },
  { id: '21', name: 'Food' },
  { id: '22', name: 'Drink' },
  { id: '23', name: 'Medicine' },
  { id: '24', name: 'Resources' },
  { id: '25', name: 'Components' },
  { id: '26', name: 'Details' },
  { id: '27', name: 'Currency' },
  { id: '28', name: 'Recipe' },
  { id: '29', name: 'Modifier' },
  { id: '30', name: 'Misc' },
  { id: '31', name: 'Collection' },
  { id: '32', name: 'Repair kit' },
  { id: '33', name: 'Suit' },
  { id: '34', name: 'Manual' },
  { id: '35', name: 'Pet' },
  { id: '36', name: 'Fishing chair' },
  { id: '43', name: 'Multiplicator reel' },
  { id: '44', name: 'Inercial reel' },
  { id: '45', name: 'Лодка' },
  { id: '46', name: 'Лодочный мотор' },
  { id: '47', name: 'Лодочный стакан' },
  { id: '48', name: 'Эхолот лодочный' },
  { id: '51', name: 'Collection' },
  { id: '53', name: 'Setup item' },
  { id: '56', name: 'Container' },
];

export const lures = [{ id: '12', name: 'fishing lure' }];

export const baits = [
  { id: '10', name: 'bait' },
  { id: '11', name: 'imitation bait' },
];

export const lines = [{ id: '5', name: 'Line' }];
export const lineSubtypes = [{ name: 'Fly fishing line', subtypeId: '3' }];
export const leaders = [{ id: '8', name: 'leader' }];

export const floats = [{ id: '9', name: 'float' }];

export const flies = [{ id: '49', name: 'fly for flyfishing' }];

export const hooks = [{ id: '6', name: 'Hook' }];

export const feeders = [{ id: '7', name: 'feeder' }];

export const reels = [{ id: '4', name: 'Reel' }];

export const rods = [
  { id: '1', name: 'Float rod' },
  { id: '2', name: 'Feeder rod' },
  { id: '3', name: 'Spinning rod' },
  { id: '42', name: 'Flyfishing rod' },
];

export const rodSubtypes = [
  { id: '20', name: 'Stick rod', subtypeId: '2' },
  { id: '41', name: 'Casting rod' },
  { id: '50', name: 'Match rod', subtypeId: '1' },
  { id: '52', name: 'Sea weighted rod' },
  { id: '54', name: 'Picker rod' },
  { id: '55', name: 'Carpfishing rod' },
];

export const attractantTypes = [{ id: '37', name: 'Dry attractant' }];

export const attractantPrepared = [{ id: '38', name: 'Prepared attractant' }];

export const attractantIngredients = [
  { id: '39', name: 'Attractant base' },
  { id: '40', name: 'Dips' },
];

export const mainTypes = [
  ...lures.map((el) => ({ ...el, mainType: 'lure' })),
  ...baits.map((el) => ({ ...el, mainType: 'bait' })),
  ...lines.map((el) => ({ ...el, mainType: 'line' })),
  ...leaders.map((el) => ({ ...el, mainType: 'leader' })),
  ...floats.map((el) => ({ ...el, mainType: 'float' })),
  ...flies.map((el) => ({ ...el, mainType: 'fly' })),
  ...hooks.map((el) => ({ ...el, mainType: 'hook' })),
  ...feeders.map((el) => ({ ...el, mainType: 'feeder' })),
  ...reels.map((el) => ({ ...el, mainType: 'reel' })),
  ...rods.map((el) => ({ ...el, mainType: 'rod' })),
  ...attractantTypes.map((el) => ({ ...el, mainType: 'attractantTypes' })),
  ...attractantPrepared.map((el) => ({ ...el, mainType: 'attractant' })),
  ...attractantIngredients.map((el) => ({ ...el, mainType: 'attractantIngredient' })),
];
