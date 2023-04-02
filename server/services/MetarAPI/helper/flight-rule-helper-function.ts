import { IFlightRule } from "../interfaces/IMetar.js";

export default function getFlightRule(
  visibility: { value: number | string | undefined; unit: string },
  cloud_base: number | undefined,
  unit: string
): IFlightRule {
  if (unit === "meters") {
    return metersFLR(visibility, cloud_base);
  } else return nauticalMilesFLR(visibility, cloud_base);
}

function metersFLR(
  visibility: { value: number | string | undefined; unit: string },
  cloud_base: number | undefined
): IFlightRule {
  if (cloud_base === undefined) return { flight_rule: "", color_code: "" };
  if (typeof visibility === "string" && visibility === "CAVOK") {
    return { flight_rule: "VFR", color_code: "green" };
  } else if (
    (typeof visibility === "number" && visibility <= 1500) ||
    cloud_base * 100 <= 500
  ) {
    return { flight_rule: "LIFR", color_code: "purple" };
  } else if (
    (typeof visibility === "number" && visibility <= 5000) ||
    cloud_base * 100 <= 1000
  ) {
    return { flight_rule: "IFR", color_code: "red" };
  } else if (
    (typeof visibility === "number" && visibility <= 8000) ||
    cloud_base * 100 <= 3000
  ) {
    return { flight_rule: "MVFR", color_code: "blue" };
  } else if (
    (typeof visibility === "number" && visibility > 8000) ||
    cloud_base * 100 > 3000
  ) {
    return { flight_rule: "VFR", color_code: "green" };
  } else {
    return { flight_rule: "incomplete data", color_code: "black" };
  }
}
//! add nm data for FLR
function nauticalMilesFLR(
  visibility: { value: number | string | undefined; unit: string },
  cloud_base: number | undefined
): IFlightRule {
  if (cloud_base === undefined) return { flight_rule: "", color_code: "" };
  if (typeof visibility === "string" && visibility === "CAVOK") {
    return { flight_rule: "VFR", color_code: "green" };
  } else if (
    (typeof visibility === "number" && visibility <= 1500) ||
    cloud_base * 100 <= 500
  ) {
    return { flight_rule: "LIFR", color_code: "purple" };
  } else if (
    (typeof visibility === "number" && visibility <= 5000) ||
    cloud_base * 100 <= 1000
  ) {
    return { flight_rule: "IFR", color_code: "red" };
  } else if (
    (typeof visibility === "number" && visibility <= 8000) ||
    cloud_base * 100 <= 3000
  ) {
    return { flight_rule: "MVFR", color_code: "blue" };
  } else if (
    (typeof visibility === "number" && visibility > 8000) ||
    cloud_base * 100 > 3000
  ) {
    return { flight_rule: "VFR", color_code: "green" };
  } else {
    return { flight_rule: "incomplete data", color_code: "black" };
  }
}
