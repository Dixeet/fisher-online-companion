import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const COMMAND = 'cwebp';

export default function generateImages(weapons, fishes, maps, outputDir, sourceDir) {
  generate(weapons, outputDir, sourceDir, 'Weapons', 'weapons', ['-q', '60', '-resize', '64', '0']);
  generate(fishes, outputDir, sourceDir, 'Fish', 'fishes');
  generate(maps, outputDir, sourceDir, 'Bases', 'maps');
}

function generate(
  array,
  outputDir,
  sourceDir,
  dir,
  dirPrefix,
  cliOptions = ['-q', '60', '-resize', '300', '0'],
) {
  for (const el of array) {
    const commandArgs = [
      ...cliOptions,
      getPath(sourceDir, dir, `${el.id}.png`),
      '-o',
      getPath(outputDir, dirPrefix, `${el.id}.webp`),
    ];
    spawn(COMMAND, commandArgs);
  }
}

function getPath(...paths) {
  return resolve(cwd(), ...paths);
}
