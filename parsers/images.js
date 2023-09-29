import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const COMMAND = 'cwebp';

export default function generateImages(weapons, fishes, maps, outputDir, sourceDir) {
  generate(weapons, outputDir, sourceDir, 'Weapons', 'weapons');
  generate(fishes, outputDir, sourceDir, 'Fish', 'fishes');
  generate(maps, outputDir, sourceDir, 'Bases', 'maps');
}

function generate(array, outputDir, sourceDir, dir, dirPrefix) {
  for (const el of array) {
    const commandArgs = [
      '-q',
      '70',
      '-resize',
      '384',
      '0',
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
