import { writeFile } from 'node:fs/promises';
import lineByLine from 'n-readlines';

const DEFAULT_OPTIONS = {
  from: {
    mapsTxtPath: '',
  },
  to: {
    mapsPath: '',
  },
  write: true,
};

export default async function parseMaps(options = DEFAULT_OPTIONS) {
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const maps = read(options.from.mapsTxtPath);

  if (options.write) {
    await writeFile(options.to.mapsPath, JSON.stringify(maps));
  }
  return maps;
}

function read(mapsTxtPath) {
  const liner = new lineByLine(mapsTxtPath);
  const maps = [];

  let line;
  while ((line = liner.next())) {
    const str = line.toString();
    const find = str.match(/.?\d+(?=_Name=|_Name = )|(?<=_Name=|_Name = ).*/g);
    if (find && find[1] && find[1] !== 'OFF' && find[0] > 0) {
      let fish = {
        id: find[0],
        name: find[1].trim(),
      };
      maps.push(fish);
    }
  }

  return maps;
}
