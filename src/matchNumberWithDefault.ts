import { ExtractOutput, ValidateOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type NumberCaseHandlers<Output> = {
  [key: number]: (value: number) => Output;
} & {
  _: (value: number) => Output;
};

const matchNumberWithDefault = <
  Output,
  Cases extends NumberCaseHandlers<Output>,
>(
  value: number,
  cases: Cases,
): ExtractOutput<Cases, Output> => {
  if (value in cases) {
    // @ts-expect-error
    return cases[value](value);
  } else if ("_" in cases) {
    // @ts-expect-error
    return cases._(value);
  }
  throw new Error(`No case handler for value: ${value}`);
};

// Exemple d'utilisation
const result = matchNumberWithDefault(1, {
  1: (value) => `One: ${value}`,
  2: (value) => `Two: ${value}`,
  _: (value) => 3,
});

console.log(result); // Output: One: 1
