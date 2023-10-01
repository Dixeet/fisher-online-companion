export function useEquipmentInfos() {
  return {
    rod: [
      (p) => `Strength: ${p ?? 'x'}kg`,
      (p) => `Length: ${p ?? 'x'}m`,
      (p) => `Test: ${p[0] ?? 'x'}-${p[1] ?? 'x'}g`,
    ],
    line: [(p) => `Strength: ${p ?? 'x'}kg`, (p) => `Thickness: ${p ?? 'x'}mm`],
  };
}
