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
    },
    reel: {
      name: 'Choose a reel',
    },
    line: {
      name: 'Choose a line',
    },
    leader: {
      name: 'Choose a leader',
    },
    hook: {
      name: 'Choose a hook',
    },
    lure: {
      name: 'Choose a lure',
    },
    bait: {
      name: 'Choose a bait',
    },
    float: {
      name: 'Choose a float',
    },
    feeder: {
      name: 'Choose a feeder',
    },
    attractant: {
      name: 'Choose a attractant',
    },
  };
}
