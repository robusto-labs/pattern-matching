import { G } from "@mobily/ts-belt";
import { ExtractOutput } from "./matchPrimitive";

// Définir un type utilitaire pour les cas
type BooleanCaseHandlers<Output> = {
  true: (value: true) => Output;
  false: (value: false) => Output;
};

// Fonction pour matcher les valeurs booléennes
function matchBoolean<Output, Cases extends BooleanCaseHandlers<Output>>(
  value: boolean,
  cases: Cases,
): ExtractOutput<Cases, Output>;

function matchBoolean<Output, Cases extends BooleanCaseHandlers<Output>>(
  cases: Cases,
): (value: boolean) => ExtractOutput<Cases, Output>;

function matchBoolean<Output, Cases extends BooleanCaseHandlers<Output>>(
  valueOrCases: boolean | BooleanCaseHandlers<Output>,
  cases?: Cases,
):
  | ExtractOutput<Cases, Output>
  | ((value: boolean) => ExtractOutput<Cases, Output>) {
  debugger;
  if (typeof valueOrCases === "boolean") {
    const value = valueOrCases;
    if (value === true) {
      // @ts-expect-error
      return cases.true(value);
    } else if (value === false) {
      // @ts-expect-error
      return cases.false(value);
    }
    throw new Error(`No case handler for value: ${value}`);
  } else if (G.isObject(valueOrCases)) {
    const cases = valueOrCases;
    //@ts-expect-error
    return (value: boolean) => {
      if (value === true) {
        return cases.true(value);
      } else if (value === false) {
        return cases.false(value);
      }
      throw new Error(`No case handler for value: ${value}`);
    };
  }
  throw new Error("Invalid arguments");
}

const matchBooleanCurried = matchBoolean({
  true: (value) => `It's true!`,
  false: (value) => 3,
});

const result2 = matchBooleanCurried(false);

console.log(result2); // Output: 3
