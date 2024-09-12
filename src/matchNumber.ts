import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type NumberCaseHandlers<UnionType extends number, Output> = {
  [K in UnionType]: (value: K) => Output;
};

// Fonction pour matcher les nombres
export const matchNumber = <
  UnionType extends number,
  Cases extends NumberCaseHandlers<UnionType, Output>,
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
