import { writeFile } from 'node:fs/promises';
import lineByLine from 'n-readlines';

const DEFAULT_OPTIONS = {
  from: {
    fishTxtPath: '',
  },
  to: {
    fishesPath: '',
  },
  write: true,
};

export default async function parseFishes(options = DEFAULT_OPTIONS) {
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const fishes = read(options.from.fishTxtPath);

  if (options.write) {
    await writeFile(options.to.fishesPath, JSON.stringify(fishes));
  }
  return fishes;
}

function read(fishTxtPath) {
  const liner = new lineByLine(fishTxtPath);
  const fishes = [];

  let line;
  while ((line = liner.next())) {
    const str = line.toString();
    const find = str.match(/.?\d+(?=_Name=|_Name = )|(?<=_Name=|_Name = ).*/g);
    if (find && find[1] && find[1] !== 'OFF' && find[0] > 0) {
      fishes.push({
        id: find[0],
        name: find[1].trim(),
      });
    }
  }

  return fishes;
}
