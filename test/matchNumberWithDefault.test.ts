import { matchNumberWithDefault } from "../src/matchNumberWithDefault";

describe("matchNumberWithDefault", () => {
  it("should match specific number case", () => {
    const result = matchNumberWithDefault(2, {
      1: () => "One",
      2: () => "Two",
      _: () => "Default",
    });
    expect(result).toBe("Two");
  });

  it("should match default case", () => {
    const result = matchNumberWithDefault(5, {
      1: () => "One",
      2: () => "Two",
      _: () => "Default",
    });
    expect(result).toBe("Default");
  });
});
