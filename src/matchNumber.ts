import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type NumberCaseHandlers<UnionType extends number, Output> = {
  [K in UnionType]: (value: K) => Output;
};

// Fonction pour matcher les nombres
const matchNumber = <
  UnionType extends number,
  Cases extends NumberCaseHandlers<UnionType, Output>,
  Output,
>(
  value: UnionType,
  cases: Cases,
): ExtractOutput<Cases, Output> => {
  if (value in cases) {
    // @ts-expect-error
    return cases[value](value);
  }
  throw new Error(`No case handler for value: ${value}`);
};

// Exemple d'utilisation
const result = matchNumber(1 as 1 | 2 | 3, {
  1: (value) => `One: ${value}`,
  2: (value) => `Two: ${value}`,
  3: (value) => false,
});

console.log(result); // Output: One: 1
