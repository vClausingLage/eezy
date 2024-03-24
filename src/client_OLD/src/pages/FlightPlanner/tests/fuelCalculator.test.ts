import { getRange } from "../helper/fuelCalculator";

describe("getRange", () => {
  test("schould return 0 if no fuel is loaded", () => {
    expect(getRange(undefined, 0, 0, undefined)).toBe(0);
  });
  test("schould return 0 if no fuel is loaded and no fuel reserve is set", () => {
    expect(getRange(undefined, 0, 0, undefined)).toBe(0);
  });
  test("schould return XXXXXXX", () => {
    expect(getRange(100, 10, 100, 10)).toBe(900);
  });
  test("schould return XXXXXXX", () => {
    expect(getRange(100, 10, 100, 0)).toBe(1000);
  });
});