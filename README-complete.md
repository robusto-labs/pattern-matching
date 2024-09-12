
# Pattern Matching Library for TypeScript

A robust TypeScript library for performing pattern matching on primitive types (`boolean`, `number`, `string`), as well as arrays and objects. This library helps create clean, type-safe conditional logic in TypeScript projects.

## Features

- **`matchBoolean`**: Match boolean values (`true`/`false`).
- **`matchNumber`**: Match numbers using literal types.
- **`matchNumberWithDefault`**: Match numbers with a default case.
- **`matchString`**: Match string literal types.
- **`matchStringWithDefault`**: Match strings with a default case.
- **`matchPrimitive`**: Match various primitive types (`string`, `number`, `boolean`, `array`, `object`).
- **`matchType`**: Exhaustive matching for discriminated unions using a `__kind` field.

## Installation

To install the library via npm, run the following command:

```bash
npm install <your-library-name>
```

Or, if you are using Yarn:

```bash
yarn add <your-library-name>
```

## Usage

### `matchBoolean`

The `matchBoolean` function allows you to match boolean values (`true` or `false`). You can pass both the value and the cases together or create a curried version.

```typescript
import { matchBoolean } from '<your-library-name>';

const matcher = matchBoolean(true as true | false, {
  true: () => "It is true",
  false: () => "It is false",
});

console.log(matcher); // Output: "It is true"
```

### `matchNumber`

Use `matchNumber` to match number literals. This function expects literal types for each number case.

```typescript
import { matchNumber } from '<your-library-name>';

const matcher = matchNumber(2 as 1 | 2 | 3, {
  1: () => "One",
  2: () => "Two",
  3: () => "Three",
});

console.log(matcher); // Output: "Two"
```

### `matchNumberWithDefault`

The `matchNumberWithDefault` function allows you to provide a default case when no specific number case is matched.

```typescript
import { matchNumberWithDefault } from '<your-library-name>';

const matcher = matchNumberWithDefault(5, {
  1: () => "One",
  2: () => "Two",
  _: () => "Default case",
});

console.log(matcher); // Output: "Default case"
```

### `matchString`

The `matchString` function allows you to match string literals.

```typescript
import { matchString } from '<your-library-name>';

const matcher = matchString("hello" as "hello" | "bye", {
  hello: () => "Hello World",
  bye: () => "Goodbye",
});

console.log(matcher); // Output: "Hello World"
```

### `matchStringWithDefault`

The `matchStringWithDefault` function lets you specify a default behavior when no string case is matched.

```typescript
import { matchStringWithDefault } from '<your-library-name>';

const matcher = matchStringWithDefault("unknown", {
  hello: () => "Hello World",
  _: () => "Default case",
});

console.log(matcher); // Output: "Default case"
```

### `matchPrimitive`

The `matchPrimitive` function supports matching on multiple primitive types like `string`, `number`, `boolean`, `array`, and `object`.

```typescript
import { matchPrimitive } from '<your-library-name>';

const matcher = matchPrimitive("hello" as string | number, {
  string: (value) => `String: ${value}`,
  number: (value) => `Number: ${value}`,
});

console.log(matcher); // Output: "String: hello"
```

### `matchType`

The `matchType` function allows exhaustive pattern matching on discriminated unions. It uses the `__kind` field to differentiate between cases.

```typescript
import { Discrim, matchType } from '<your-library-name>';

class Cat implements Discrim {
  __kind = "Cat" as const;
  constructor(public nameCat: string) {}
}

class Dog implements Discrim {
  __kind = "Dog" as const;
  constructor(public nameDog: string) {}
}

const dog = new Dog("Rex") as Dog | Cat;

const resMatchAnimal = matchType(dog, {
  Dog: (value) => {
    return 3;
  },
  Cat: (value) => {
    return value.nameCat;
  },
});

console.log(resMatchAnimal); // Output: 3
```

## Contributing

Contributions are welcome! If you find a bug or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/mattaiod/robusto-labs).

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
