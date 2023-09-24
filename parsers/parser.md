# How to

use [AssetRipper](https://github.com/AssetRipper/AssetRipper) to extract data : 

`File > Open folder` `<steamapps>/common/theFisher Online/theFisher_Data`

Then you need to spot _(and copy for ease in a dedicated directory)_ :

- `<export-dir>/theFisher/ExportedProject/Assets/Resources/Weapons.txt`
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/WpnLang.xml`
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/fishLang.txt`
- `<export-dir>/theFisher/ExportedProject/Assets/StreamingAssets/Localization/English/maps.txt`

Then use the parser to generate json files 
```bash
node parsers/parse.js -h
```

```bash
Fisher Online Parser

  Parse files previously extracted from Fisher Online and generates associated
  data json files

Examples

  $ node parsers/parse.js
  $ node parsers/parse.js -L ./WpnLang.xml --output-dir src/data/
  $ node parsers/parse.js --help
  $ example [--timeout ms] --src file ...

Options

  -h, --help                         Display this usage guide.
  -o, --output-dir string            [default: ./parsers/.tmp/] Directory to
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
```