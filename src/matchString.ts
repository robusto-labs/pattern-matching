import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type CaseHandlers<UnionType extends string, Output> = {
  [K in UnionType]: (value: K) => Output;
};

// Fonction pour matcher les chaînes de caractères
export const matchString = <
  UnionType extends string,
  Cases extends CaseHandlers<UnionType, Output>,
  Output,
>(
  value: IsLiteralUnion<UnionType> extends true ? UnionType : never,
  cases: Cases,
): ExtractOutput<Cases, Output> => {
  if (value in cases) {
    // @ts-expect-error
    return cases[value](value);
  }
  throw new Error(`No case handler for value: ${value}`);
};
