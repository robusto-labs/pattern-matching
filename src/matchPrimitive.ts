import { G } from "@mobily/ts-belt";

type TUnionType =
  | string
  | number
  | boolean
  | Record<string, any>
  | any[]
  | null
  | undefined;
export type ValidateOutput<T> = unknown extends T ? unknown : T;

type AnyTuple = [any, ...any[]];

type ExtractTupleFromUnionType<T> = T extends AnyTuple ? T : never;

type ExtractArrayFromUnionType<T> = T extends (infer U)[] ? U[] : never;

type ExtractObjectTypeFromUnionType<T> =
  T extends Record<string | number | symbol, any>
    ? T extends any[]
      ? never
      : T
    : never;

// Définir un type utilitaire pour vérifier si un type est un tuple
type IsTuple<T> = T extends [any, ...any] ? true : false;

// Définir un type utilitaire pour vérifier si un type union contient un tuple
type HasTupleInUnion<T> = (
  [T] extends [never]
    ? false
    : T extends any
      ? IsTuple<T> extends true
        ? true
        : false
      : false
) extends false
  ? false
  : true;

// Vérifier si un type est un Record
type IsRecord<T> =
  T extends Record<string | number | symbol, any> ? true : false;

// Vérifier si un type union contient un Record
type HasRecordInUnion<T> = (
  [T] extends [never]
    ? false
    : T extends any
      ? IsRecord<T> extends true
        ? true
        : false
      : false
) extends false
  ? false
  : true;

type HasUndefinedInUnion<T> = undefined extends T ? true : false;

export type TMatchType<UnionType, Output> = (string extends UnionType
  ? { string: (value: string) => Output }
  : {}) &
  (number extends UnionType ? { number: (value: number) => Output } : {}) &
  (boolean extends UnionType ? { boolean: (value: boolean) => Output } : {}) &
  (HasTupleInUnion<UnionType> extends true
    ? { array: (value: ExtractTupleFromUnionType<UnionType>) => Output }
    : {}) &
  (any[] extends UnionType
    ? { array: (value: ExtractArrayFromUnionType<UnionType>) => Output }
    : {}) &
  (HasRecordInUnion<UnionType> extends true
    ? { object: (value: ExtractObjectTypeFromUnionType<UnionType>) => Output }
    : {}) &
  (null extends UnionType ? { null: (value: null) => Output } : {}) &
  (HasUndefinedInUnion<UnionType> extends true
    ? { undefined: (value: undefined) => Output }
    : {});

export type ExtractOutput<
  Cases extends Record<string, (...args: any) => unknown>,
  Output,
> = unknown extends Output
  ? ValidateOutput<ReturnType<Cases[keyof Cases]>>
  : Output;

export const matchPrimType = <
  UnionType extends TUnionType,
  MatchType extends TMatchType<UnionType, Output>,
  Output,
>(
  value: UnionType,
  match: MatchType,
): ExtractOutput<MatchType, Output> => {
  if (typeof value === "string") {
    //@ts-expect-error
    return match.string(value);
  } else if (typeof value === "number") {
    //@ts-expect-error
    return match.number(value);
  } else if (typeof value === "boolean") {
    //@ts-expect-error
    return match.boolean(value as boolean);
  } else if (Array.isArray(value)) {
    //@ts-expect-error
    return match.array(value);
  } else if (G.isObject(value)) {
    //@ts-expect-error
    return match.object(value as Record<string, any>);
  }
  throw new Error("Type not supported");
};
