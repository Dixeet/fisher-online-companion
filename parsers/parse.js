import { cwd } from 'node:process';
import { resolve } from 'node:path';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import parseWeapons from './weapons.js';
import parseFishes from './fishes.js';
import parseMaps from './maps.js';

const DEFAULT = {
  outputDir: './parsers/.tmp/',
  sourceDir: './parsers/extract/',
  weaponsTxtFile: 'Weapons.txt',
  weaponsXmlFile: 'WpnLang.xml',
  weapons: 'weapons.json',
  weaponTypes: 'weapon-types.json',
  fishTxtFile: 'fishLang.txt',
  fishes: 'fishes.json',
  mapsTxtFile: 'maps.txt',
  maps: 'maps.json',
};

const optionDefinitions = [
  {
    name: 'help',
    description: 'Display this usage guide.',
    alias: 'h',
    type: Boolean,
  },
  {
    name: 'output-dir',
    alias: 'o',
    type: String,
    defaultValue: DEFAULT.outputDir,
    description: `{dim [default: ${DEFAULT.outputDir}]} Directory to save generated weapons files ({underline ${DEFAULT.weapons}} and {underline ${DEFAULT.weaponTypes}}). Is override by {bold --weapons-out --weapon-types-out}`,
  },
  {
    name: 'source-dir',
    alias: 's',
    type: String,
    defaultValue: DEFAULT.sourceDir,
    description: `{dim [default: ${DEFAULT.sourceDir}]} Source directory of extrated files to parse ({underline ${DEFAULT.weaponsTxtFile}} and {underline ${DEFAULT.weaponsXmlFile}}). Is override by {bold --weapons-text-source --weapons-lang-source}`,
  },
  {
    name: 'weapons-out',
    alias: 'w',
    type: String,
    description: 'Path of generated weapons json file',
  },
  {
    name: 'weapons-text-source',
    alias: 'W',
    type: String,
    description: 'Path of weapons text file source to parse',
  },
  {
    name: 'weapon-types-out',
    alias: 't',
    type: String,
    description: 'Path of generated weapon-types json file',
  },
  {
    name: 'weapons-lang-source',
    alias: 'L',
    type: String,
    description: 'Path of weapons xml file source to parse',
  },
  {
    name: 'fishes-out',
    alias: 'f',
    type: String,
    description: 'Path of generated fishes json file',
  },
  {
    name: 'fishes-text-source',
    alias: 'F',
    type: String,
    description: 'Path of fishes text file source to parse',
  },
  {
    name: 'maps-out',
    alias: 'm',
    type: String,
    description: 'Path of generated maps json file',
  },
  {
    name: 'maps-text-source',
    alias: 'M',
    type: String,
    description: 'Path of maps text file source to parse',
  },
];
const argv = commandLineArgs(optionDefinitions);

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
  parseWeapons(options);
  parseFishes(options);
  parseMaps(options);
} else {
  const sections = [
    {
      header: 'Fisher Online Parser',
      content:
        'Parse files previously extracted from Fisher Online and generates associated data json files',
    },
    {
      header: 'Examples',
      content: [
        '$ node parsers/parse.js',
        '$ node parsers/parse.js {bold -L} {underline ./WpnLang.xml} {bold --output-dir} {underline src/data/}',
        '$ node parsers/parse.js {bold --help}',
        '$ example [{bold --timeout} {underline ms}] {bold --src} {underline file} ...',
      ],
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
    {
      header: 'Extra',
      content: 'Project home: https://github.com/Dixeet/fisher-online-companion',
    },
  ];
  console.log(commandLineUsage(sections));
}

function getPath(...paths) {
  return resolve(cwd(), ...paths);
}
