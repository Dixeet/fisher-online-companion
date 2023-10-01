import { readFile } from 'node:fs/promises';
import xml2js from 'xml2js';
import { excluded } from './additionnalInfos.js';

export default async function parseXml(path) {
  const xml = await readFile(path);
  const parser = xml2js.Parser();
  const {
    wpnlang: {
      wpntypes: [{ type: types }],
      weapons: [{ weapon: weaponsXML }],
    },
  } = await parser.parseStringPromise(xml);

  const weaponTypes = [];
  for (const {
    $: { id, name },
  } of types) {
    if (!excluded.some((exclude) => exclude.id === id))
      weaponTypes.push({
        id,
        name,
      });
  }

  const weapons = [];
  for (const {
    $: { id },
    name: [name],
    info: [info],
  } of weaponsXML) {
    if (!name.startsWith('-') && !name.startsWith('\r\n')) {
      weapons.push({
        id,
        name,
        info: info.startsWith('\r\n') ? '' : info.trim(),
      });
    }
  }

  return {
    weapons,
    weaponTypes,
  };
}
