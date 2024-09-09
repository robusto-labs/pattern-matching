import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type CaseHandlers<UnionType extends string, Output> = {
  [K in UnionType]: (value: K) => Output;
};

type IsLiteralUnion<T, BaseType extends T = T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: BaseType) => void
  ? false
  : true;

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

// Exemple d'utilisation
const res = matchString("a" as "a" | "b", {
  a: (value) => {
    console.log(value);
    return "ok";
  },
  b: (value) => {
    console.log(value);
    return 3;
  },
});
