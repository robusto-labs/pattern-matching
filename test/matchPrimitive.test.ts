import { matchPrimitive } from "../src";

describe("matchPrimitive", () => {
  it("should match string type", () => {
    const result = matchPrimitive("hello" as string | number, {
      string: (value) => `String: ${value}`,
      number: (value) => `Number: ${value}`,
    });
    expect(result).toBe("String: hello");
  });

  it("should match number type", () => {
    const result = matchPrimitive(42 as number | string, {
      number: (value) => `Number: ${value}`,
      string: (value) => `String: ${value}`,
    });
    expect(result).toBe("Number: 42");
  });

  it("should throw an error for unsupported type", () => {
    expect(() =>
      matchPrimitive({} as { name: "ùatt" } | { ff: "mag" }, {
        object: () => "Object",
      }),
    ).toThrow("Type not supported");
  });
});
