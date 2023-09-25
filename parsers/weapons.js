import { writeFile } from 'node:fs/promises';
import lineByLine from 'n-readlines';
import parseXml from './weaponsXML.js';

const DEFAULT_OPTIONS = {
  from: {
    weaponsTxtPath: '',
    weaponsXmlPath: '',
  },
  to: {
    weaponsPath: '',
    weaponTypesPath: '',
  },
  write: true,
};

export default async function parseWeapons(options = DEFAULT_OPTIONS) {
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const { weapons, weaponTypes } = await read(
    options.from.weaponsTxtPath,
    options.from.weaponsXmlPath,
  );
  if (options.write) {
    await Promise.all([
      writeFile(options.to.weaponsPath, JSON.stringify(weapons)),
      writeFile(options.to.weaponTypesPath, JSON.stringify(weaponTypes)),
    ]);
  }
  return {
    weapons,
    weaponTypes,
  };
}

async function read(weaponsTxtPath, weaponsXmlPath) {
  const liner = new lineByLine(weaponsTxtPath);
  const weaps = [];
  const { weapons, weaponTypes } = await parseXml(weaponsXmlPath);

  let line;
  let currentWeapon = null;
  while ((line = liner.next())) {
    const str = line.toString();
    currentWeapon = findCurrentWeapon(str, currentWeapon, weapons);
    currentWeapon = findCurrentType(str, currentWeapon, weaponTypes);
    currentWeapon = findCurrentPar(str, currentWeapon);
    if (endOfWeapon(str) && currentWeapon) {
      weaps.push(currentWeapon);
      currentWeapon = null;
    }
  }
  return {
    weapons: weaps,
    weaponTypes,
  };
}

function findCurrentWeapon(str, weapon, weapons) {
  if (!weapon) {
    const idFound = str.match(/(?<=^id=)(.*)/g);
    if (idFound) {
      weapon = weapons.find((weapon) => weapon.id === idFound[0]);
    }
  }
  return weapon;
}

function findCurrentType(str, weapon, weaponTypes) {
  if (weapon) {
    const typeIdFound = str.match(/(?<=wtype=)(.+)/g);
    if (typeIdFound) {
      const type = weaponTypes.find((type) => type.id === typeIdFound[0]);
      if (type) {
        weapon.type = type;
      }
    }
  }
  return weapon;
}

function findCurrentPar(str, weapon) {
  if (weapon) {
    const parFound = str.match(/(?<=<basePar>)(.*)(?=<\/basePar>)/g);
    if (parFound) {
      weapon.par = parFound[0].split('/');
    }
  }
  return weapon;
}

function endOfWeapon(str) {
  return str.includes('wpnend=1');
}
