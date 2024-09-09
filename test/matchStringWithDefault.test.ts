import { matchStringWithDefault } from "../src/matchStringWithDefault";

describe("matchStringWithDefault", () => {
  it("should match specific string case", () => {
    const result = matchStringWithDefault("hello", {
      hello: () => "Hello World",
      _: () => "Default",
    });
    expect(result).toBe("Hello World");
  });

  it("should match default case", () => {
    const result = matchStringWithDefault("unknown", {
      hello: () => "Hello World",
      _: () => "Default",
    });
    expect(result).toBe("Default");
  });
});
