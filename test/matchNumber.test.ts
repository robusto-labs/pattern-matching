import { matchNumber } from "../src/matchNumber";

describe("matchNumber", () => {
  it("should match specific number case", () => {
    const result = matchNumber(2 as 1 | 2 | 3, {
      1: () => "One",
      2: () => "Two",
      3: () => "Three",
    });
    expect(result).toBe("Two");
  });

  it("should throw an error for unmatched number", () => {
    expect(() =>
      matchNumber(1 as 1 | 2, {
        1: () => "One",
        2: () => "Two",
      }),
    ).toThrow("No case handler for value: 5");
  });
});
