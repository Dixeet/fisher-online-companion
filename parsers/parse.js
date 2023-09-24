import { cwd } from 'node:process';
import { resolve } from 'node:path';
import commandLineArgs from 'command-line-args';
import parseWeapons from './weapons.js';

const DEFAULT = {
  outputDir: 'parsers/.tmp/',
  sourceDir: 'parsers/extract/',
  weaponsTxtFile: 'Weapons.txt',
  weaponsXmlFile: 'WpnLang.xml',
  weapons: 'weapons.json',
  weaponTypes: 'weapon-types.json',
};

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String, defaultValue: DEFAULT.outputDir },
  { name: 'source', alias: 's', type: String, defaultValue: DEFAULT.sourceDir },
  { name: 'weapons-out', alias: 'w', type: String },
  { name: 'weapons-text-source', alias: 'W', type: String },
  { name: 'weapon-types-out', alias: 't', type: String },
  { name: 'weapons-lang-source', alias: 'L', type: String },
];
const argv = commandLineArgs(optionDefinitions);

const options = {
  from: {
    weaponsTxtPath: argv['weapons-text-source']
      ? getPath(argv['weapons-text-source'])
      : getPath(argv.source, DEFAULT.weaponsTxtFile),
    weaponsXmlPath: argv['weapons-lang-source']
      ? getPath(argv['weapons-lang-source'])
      : getPath(argv.source, DEFAULT.weaponsXmlFile),
  },
  to: {
    weaponsPath: argv['weapons-out']
      ? getPath(argv['weapons-out'])
      : getPath(argv.output, DEFAULT.weapons),
    weaponTypesPath: argv['weapon-types-out']
      ? getPath(argv['weapon-types-out'])
      : getPath(argv.output, DEFAULT.weaponTypes),
  },
};
console.log(argv);
console.log(options);
parseWeapons(options);

function getPath(...paths) {
  return resolve(cwd(), ...paths);
}
