# How to

## Usage

use [AssetRipper](https://github.com/AssetRipper/AssetRipper) to extract data : 

`File > Open folder` `<steamapps>/common/theFisher Online/theFisher_Data`

Then you need to spot _(and copy for ease in a dedicated directory parsers/extract)_ :

- `<export-dir>/theFisher/ExportedProject/Assets/Resources/Weapons.txt` file
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/WpnLang.xml` file
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/fishLang.txt` file
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/maps.txt` file
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Textures/Bases` maps images directory
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Textures/Weapons` weapons images directory
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Textures/Fish` fishes images directory

Then use the parser to generate json files 
```bash
node parsers/parse.js
```

Generate images
```bash
node parsers/parse.js -g
```

## CLI
```bash
$ node parsers/parse.js -h

Fisher Online Parser

  Parse files previously extracted from Fisher Online and generates associated  
  data json files and images

Examples

  $ node parsers/parse.js
  $ node parsers/parse.js -L ./WpnLang.xml --output-dir src/data/
  $ node parsers/parse.js --help

Options

  -h, --help                         Display this usage guide.
  -o, --output-dir string            [default: ./public/data/] Directory to
                                     save generated weapons files (weapons.json
                                     and weapon-types.json). Is override by
                                     --weapons-out --weapon-types-out
  -s, --source-dir string            [default: ./parsers/extract/] Source
                                     directory of extrated files to parse
                                     (Weapons.txt and WpnLang.xml). Is override
                                     by --weapons-text-source                   
                                     --weapons-lang-source
  -w, --weapons-out string           Path of generated weapons json file
  -W, --weapons-text-source string   Path of weapons text file source to parse
  -t, --weapon-types-out string      Path of generated weapon-types json file
  -L, --weapons-lang-source string   Path of weapons xml file source to parse
  -f, --fishes-out string            Path of generated fishes json file
  -F, --fishes-text-source string    Path of fishes text file source to parse
  -m, --maps-out string              Path of generated maps json file
  -M, --maps-text-source string      Path of maps text file source to parse
  -i, --images-output-dir string     [default: ./src/assets/images] Directory
                                     to save generated images, must contains
                                     maps/ (maps), fishes/ (fishes) and
                                     weapons/ (weapons) directories
  -I, --images-source-dir string     [default: ./parsers/extract/images] Source
                                     directory of images, must contains Bases/
                                     (maps), Fish/ (fishes) and Weapons/
                                     (weapons) directories
  -g, --generate-images              Generate images from ids of others data.
                                     No file will be created besides the
                                     images.
```