import { matchString } from "../src/matchString";

describe("matchString", () => {
  it("should match specific string case", () => {
    const result = matchString("hello" as "hello" | "bye", {
      hello: () => "Hello World",
      bye: () => "Goodbye",
    });
    expect(result).toBe("Hello World");
  });

  it("should throw an error for unmatched string", () => {
    expect(() =>
      matchString("unknown" as "unknown" | "fdf", {
        fdf: () => "FDF",
        unknown: () => "Unknown",
      }),
    ).toThrow("No case handler for value: unknown");
  });
});
