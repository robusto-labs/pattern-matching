import { matchBoolean } from "../src/matchBoolean";

describe("matchBoolean", () => {
  it("should match true case", () => {
    const result = matchBoolean(true, {
      true: () => "It is true",
      false: () => "It is false",
    });
    expect(result).toBe("It is true");
  });

  it("should match false case", () => {
    const result = matchBoolean(false, {
      true: () => "It is true",
      false: () => "It is false",
    });
    expect(result).toBe("It is false");
  });

  it("should return a function when only cases are provided", () => {
    const matcher = matchBoolean({
      true: () => "It is true",
      false: () => "It is false",
    });
    expect(matcher(true)).toBe("It is true");
    expect(matcher(false)).toBe("It is false");
  });

  it("should throw an error for invalid input", () => {
    expect(() =>
      matchBoolean(123 as unknown as boolean, {
        true: () => "It is true",
        false: () => "It is false",
      }),
    ).toThrow("Invalid arguments");
  });
});
