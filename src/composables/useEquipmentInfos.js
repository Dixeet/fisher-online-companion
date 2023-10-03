export function useEquipmentInfos() {
  return {
    rod: [
      (par, index) => `Strength: ${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `Length: ${par && par[index] ? par[index] : ''}m`,
      (par, index) =>
        `Test: ${par && par[index] && par[index][0] ? par[index][0] : ''}-${
          par && par[index] && par[index][1] ? par[index][1] : ''
        }g`,
    ],
    reel: [
      (par, index) => `Friction: ${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `Power: ${par && par[index + 1] ? par[index + 1] : ''}kg`,
    ],
    line: [
      (par, index) => `Strength: ${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `Thickness: ${par && par[index] ? par[index] : ''}mm`,
    ],
    leader: [
      (par, index) => `Strength: ${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `Thickness: ${par && par[index] ? par[index] : ''}mm`,
    ],
    float: [(par, index) => `Buoyancy: ${par && par[index] ? par[index] : ''}g`],
  };
}

export function useEquipmentInfosShort() {
  return {
    rod: [
      (par, index) => `${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `${par && par[index] ? par[index] : ''}m`,
      (par, index) =>
        `${par && par[index] && par[index][0] ? par[index][0] : ''}-${
          par && par[index] && par[index][1] ? par[index][1] : ''
        }g`,
    ],
    reel: [
      (par, index) => `${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `${par && par[index + 1] ? par[index + 1] : ''}kg`,
    ],
    line: [
      (par, index) => `${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `${par && par[index] ? par[index] : ''}mm`,
    ],
    leader: [
      (par, index) => `${par && par[index] ? par[index] : ''}kg`,
      (par, index) => `${par && par[index] ? par[index] : ''}mm`,
    ],
    float: [(par, index) => `${par && par[index] ? par[index] : ''}g`],
  };
}

export function useNewTackle() {
  return {
    name: '',
    rod: {
      name: 'Choose a rod',
      mainType: 'rod',
    },
    reel: {
      name: 'Choose a reel',
      mainType: 'reel',
    },
    line: {
      name: 'Choose a line',
      mainType: 'line',
    },
    leader: {
      name: 'Choose a leader',
      mainType: 'leader',
    },
    hook: {
      name: 'Choose a hook',
      mainType: 'hook',
    },
    lure: {
      name: 'Choose a lure',
      mainType: 'lure',
    },
    bait: {
      name: 'Choose a bait',
      mainType: 'bait',
    },
    float: {
      name: 'Choose a float',
      mainType: 'float',
    },
    feeder: {
      name: 'Choose a feeder',
      mainType: 'feeder',
    },
    attractant: {
      name: 'Choose a attractant',
      mainType: 'attractant',
    },
  };
}
