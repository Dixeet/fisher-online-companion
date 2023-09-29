import { cwd } from 'node:process';
import { resolve } from 'node:path';
import command from './command.js';
import parseWeapons from './weapons.js';
import parseFishes from './fishes.js';
import parseMaps from './maps.js';
import generateImages from './images.js';

const DEFAULT = {
  outputDir: './public/data/',
  sourceDir: './parsers/extract/',
  imagesOutputDir: './src/assets/images',
  imagesSourcetDir: './parsers/extract/images',
  generateImages: false,
  weaponsTxtFile: 'Weapons.txt',
  weaponsXmlFile: 'WpnLang.xml',
  weapons: 'weapons.json',
  weaponTypes: 'weapon-types.json',
  fishTxtFile: 'fishLang.txt',
  fishes: 'fishes.json',
  mapsTxtFile: 'maps.txt',
  maps: 'maps.json',
};

const { argv, output } = command(DEFAULT);

const options = {
  from: {
    weaponsTxtPath: argv['weapons-text-source']
      ? getPath(argv['weapons-text-source'])
      : getPath(argv['source-dir'], DEFAULT.weaponsTxtFile),
    weaponsXmlPath: argv['weapons-lang-source']
      ? getPath(argv['weapons-lang-source'])
      : getPath(argv['source-dir'], DEFAULT.weaponsXmlFile),
    fishTxtPath: argv['fishes-text-source']
      ? getPath(argv['fishes-text-source'])
      : getPath(argv['source-dir'], DEFAULT.fishTxtFile),
    mapsTxtPath: argv['maps-text-source']
      ? getPath(argv['maps-text-source'])
      : getPath(argv['source-dir'], DEFAULT.mapsTxtFile),
  },
  to: {
    weaponsPath: argv['weapons-out']
      ? getPath(argv['weapons-out'])
      : getPath(argv['output-dir'], DEFAULT.weapons),
    weaponTypesPath: argv['weapon-types-out']
      ? getPath(argv['weapon-types-out'])
      : getPath(argv['output-dir'], DEFAULT.weaponTypes),
    fishesPath: argv['fishes-out']
      ? getPath(argv['fishes-out'])
      : getPath(argv['output-dir'], DEFAULT.fishes),
    mapsPath: argv['maps-out']
      ? getPath(argv['maps-out'])
      : getPath(argv['output-dir'], DEFAULT.maps),
  },
};
if (!argv.help) {
  if (argv['generate-images']) {
    options.write = false;
    const [{ weapons }, fishes, maps] = await Promise.all([
      parseWeapons(options),
      parseFishes(options),
      parseMaps(options),
    ]);
    generateImages(weapons, fishes, maps, DEFAULT.imagesOutputDir, DEFAULT.imagesSourcetDir);
  } else {
    parseWeapons(options);
    parseFishes(options);
    parseMaps(options);
  }
} else {
  // eslint-disable-next-line no-console
  console.log(output);
}

function getPath(...paths) {
  return resolve(cwd(), ...paths);
}
