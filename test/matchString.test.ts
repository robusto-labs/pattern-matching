import { matchString } from "../src/matchString";

describe("matchString", () => {
  it("should match specific string case", () => {
    const result = matchString("hello", {
      hello: () => "Hello World",
      bye: () => "Goodbye",
    });
    expect(result).toBe("Hello World");
  });

  it("should throw an error for unmatched string", () => {
    expect(() =>
      matchString("unknown", {
        hello: () => "Hello World",
      }),
    ).toThrow("No case handler for value: unknown");
  });
});
