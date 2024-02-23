import { dateFormat, windFormat, windFormatSpec, windVarFormat, precipFormat, cloudFormat, tempFormat } from "../helper/metarHelperFunctions";

describe("dateFormat", () => {
  test("schould return a date object", () => {
    expect(dateFormat("010000Z")).toBeInstanceOf(Date);
  });
  test("schould return a date object", () => {
    let today = new Date();
    let date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1, 18, 50, 0));
    expect(JSON.stringify(dateFormat("011850Z"))).toEqual(JSON.stringify(date));
  });
});

describe("windFormat", () => {
  test("schould return a wind object", () => {
    expect(windFormat("13009KT")).toEqual({ direction: 130, speed: 9, unit: "kts" });
  });
  test("schould return a wind object with gusts", () => {
    expect(windFormat("13009G15KT")).toEqual({ direction: 130, speed: 9, gusts: 15, unit: "kts" });
  });
});

describe("windFormatSpec", () => {
  test("schould return a wind object with various winds", () => {
    expect(windFormatSpec("VRB09KT")).toEqual({ direction: "more than 30", speed: 9, unit: "kts" });
  });
});

describe("windVarFormat", () => {
  test("schould return a windVar object", () => {
    expect(windVarFormat("130V170")).toEqual([130, 170]);
  });
});

describe("precipFormat", () => {
  test("schould return a precip object", () => {
    expect(precipFormat("SHRA")).toEqual("showers of rain");
  });
  test("schould return a precip object", () => {
    expect(precipFormat("SHRA")).toEqual("showers of rain");
  });
});

describe("cloudFormat", () => {
  test("schould return a cloud object", () => {
    expect(cloudFormat("BKN018")).toEqual({ cloud: "", cloudLayer: "BKN", cloudBase: 18 });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("SCT018")).toEqual({ cloud: "", cloudLayer: "SCT", cloudBase: 18 });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("FEW018")).toEqual({ cloud: "", cloudLayer: "FEW", cloudBase: 18 });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("OVC018")).toEqual({ cloud: "", cloudLayer: "OVC", cloudBase: 18 });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("VV010")).toEqual({ cloudLayer: "vertical visibility", cloudBase: 10 });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("VV///")).toEqual({ cloudLayer: "vertical visibility", cloudBase: undefined });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("NSC")).toEqual({ cloudLayer: "NSC", cloudBase: undefined });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("CLR")).toEqual({ cloudLayer: "CLR", cloudBase: undefined });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("CAVOK")).toEqual({ });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("NCD")).toEqual({ cloudLayer: "NCD", cloudBase: undefined });
  });
  test("schould return a cloud object", () => {
    expect(cloudFormat("")).toEqual({ cloudBase: 0, cloudLayer: "" });
  });
});

describe("tempFormat", () => {
  test("schould return a temp object", () => {
    expect(tempFormat("02/M04")).toEqual([2, -4]);
  });
  test("schould return a temp object", () => {
    expect(tempFormat("M04/06")).toEqual([-4, 6]);
  });
});
