import { ExtractOutput, ValidateOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type CaseHandlers<Output> = {
  [key: string]: (value: string) => Output;
} & {
  _: (value: string) => Output;
};

export const matchStringWithDefault = <
  Output,
  Cases extends CaseHandlers<Output>,
>(
  value: string,
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
