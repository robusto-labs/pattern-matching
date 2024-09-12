
# Pattern Matching Library for TypeScript

🚀 TypeScript library for performing pattern matching like a real functional programming language.

I strive to create the best experience for developers. I hope you enjoy 😊

## Features

- **`matchBoolean`**: Match exactly on union of boolean (NO DEFAULT CASE)
- **`matchNumber`**: Match exactly on union type of number (NO DEFAULT CASE)
- **`matchNumberWithDefault`**: Match any number with a default case.
- **`matchString`**: Match exactly on union of string (NO DEFAULT CASE)
- **`matchStringWithDefault`**: Match any string with a default case.
- **`matchPrimitive`**: Match exactly on union of primitive (NO DEFAULT CASE)
- **`matchType`**: Match exactly on union of class/object with a __kind key (NO DEFAULT CASE)

## Prerequisites

Ensure you have `pnpm` installed. You can install it globally using npm:

```bash
npm install -g pnpm
```

## Installation

To install the library via npm, run the following command:

```bash
pnpm install 
```
## To build and run
```bash
pnpm build:dev
```

```bash
pnpm start:dev
```


## Usage


### `matchType`

The `matchType` function allows exhaustive pattern matching on discriminated unions. It uses the `__kind` field to differentiate between cases.

```typescript

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

const matcher = matchString("hello" as "hello" | "bye", {
  hello: () => "Hello World",
  bye: () => "Goodbye",
});

console.log(matcher); // Output: "Hello World"
```

### `matchStringWithDefault`

The `matchStringWithDefault` function lets you specify a default behavior when no string case is matched.

```typescript

const matcher = matchStringWithDefault("unknown", {
  hello: () => "Hello World",
  _: () => "Default case",
});

console.log(matcher); // Output: "Default case"
```

### `matchPrimitive`

The `matchPrimitive` function supports matching on multiple primitive types like `string`, `number`, `boolean`, `array`, and `object`.

```typescript

const matcher = matchPrimitive("hello" as string | number, {
  string: (value) => `String: ${value}`,
  number: (value) => `Number: ${value}`,
});

console.log(matcher); // Output: "String: hello"
```

## Contributing

Contributions are welcome! If you find a bug or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/robusto-labs).

## License

This library is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

