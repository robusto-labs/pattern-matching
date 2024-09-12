type IsLiteralUnion<T, BaseType extends T = T> = (
  T extends any ? (arg: T) => void : never
) extends (arg: BaseType) => void
  ? false
  : true;
