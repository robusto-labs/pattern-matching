import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type CaseHandlers<UnionType extends string, Output> = {
  [K in UnionType]: (value: K) => Output;
};

// Fonction pour matcher les chaînes de caractères
const matchString = <
  UnionType extends string,
  Cases extends CaseHandlers<UnionType, Output>,
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
const result = matchString("matt" as "matt" | "louis" | "dd", {
  matt: (value) => `Hello, ${value}!`,
  louis: (value) => `Hi, ${value}!`,
  dd: (value) => 3,
});

console.log(result); // Output: Hello, matt!
