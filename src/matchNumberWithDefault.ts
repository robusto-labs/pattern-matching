import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type NumberCaseHandlers<Output> = {
  [key: number]: (value: number) => Output;
} & {
  _: (value: number) => Output;
};

export const matchNumberWithDefault = <
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
