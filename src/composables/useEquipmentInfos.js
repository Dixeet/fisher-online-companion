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
  };
}
//               {{ equipment?.par && equipment.par[index] ? par(equipment.par[index]) : '' }}
