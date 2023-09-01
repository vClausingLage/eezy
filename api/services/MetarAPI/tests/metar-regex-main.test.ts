import test, { describe } from "node:test";
import { metarDecoder } from "../helper/metar-regex-main.js";

describe("metarDecoder", () => {
  test("schould return a metar object", () => {
    expect(metarDecoder("")).toEqual({
      metar: "",
      station: "",
      time: "",
      wind: { direction: 0, speed: 0, unit: "kts" },
      visibility: 0,
      runwayVisualRange: [],
      weather: [],
      clouds: [],
      temperature: 0,
      dewPoint: 0,
      altimeter: 0,
      remarks: "",
      color: "",
    });
  });
});

// RECENT

// BCMG

// TEMPO