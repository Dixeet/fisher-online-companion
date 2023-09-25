import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

export default function command(DEFAULT) {
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
    {
      name: 'images-output-dir',
      alias: 'i',
      type: String,
      defaultValue: DEFAULT.imagesOutputDir,
      description: `{dim [default: ${DEFAULT.imagesOutputDir}]} Directory to save generated images, must contains {underline maps/} (maps), {underline fishes/} (fishes) and {underline weapons/} (weapons) directories`,
    },
    {
      name: 'images-source-dir',
      alias: 'I',
      type: String,
      defaultValue: DEFAULT.imagesSourcetDir,
      description: `{dim [default: ${DEFAULT.imagesSourcetDir}]} Source directory of images, must contains {underline Bases/} (maps), {underline Fish/} (fishes) and {underline Weapons/} (weapons) directories`,
    },
    {
      name: 'generate-images',
      alias: 'g',
      type: Boolean,
      defaultValue: DEFAULT.generateImages,
      description: `Generate images from ids of others data. No file will be created besides the images.`,
    },
  ];

  const argv = commandLineArgs(optionDefinitions);

  const sections = [
    {
      header: 'Fisher Online Parser',
      content:
        'Parse files previously extracted from Fisher Online and generates associated data json files and images',
    },
    {
      header: 'Examples',
      content: [
        '$ node parsers/parse.js',
        '$ node parsers/parse.js {bold -L} {underline ./WpnLang.xml} {bold --output-dir} {underline src/data/}',
        '$ node parsers/parse.js {bold --help}',
      ],
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
    {
      header: 'Extra',
      content: [
        'Project home: https://github.com/Dixeet/fisher-online-companion',
        'Instructions: https://github.com/Dixeet/fisher-online-companion/blob/main/parsers/parser.md',
      ],
    },
  ];
  const output = commandLineUsage(sections);

  return { argv, output };
}
