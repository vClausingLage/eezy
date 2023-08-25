import { add } from "../src/fileToTest";

describe("testing index file", () => {
  test("empty string should result in zero", () => {
    expect(add("")).toBe(0);
  });
});
