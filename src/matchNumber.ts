import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type NumberCaseHandlers<UnionType extends number, Output> = {
  [K in UnionType]: (value: K) => Output;
};

type IsLiteralUnion<T, BaseType extends T = T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: BaseType) => void
  ? false
  : true;

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

const res = matchNumber(1 as 1 | 2, {
  "1": (value) => {
    console.log(value);
    return "ok";
  },
  "2": (value) => {
    console.log(value);
    return 3;
  },
});
