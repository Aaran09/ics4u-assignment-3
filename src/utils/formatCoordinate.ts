import type { Coordinate } from "@ics4u-assignment-03/types";
import { round } from "@ics4u-assignment-03/utils/round";

const formatDisplayValue = (value: number): string => {
  if (Math.abs(value) < 0.00005) {
    return "0.0000";
  }

  return round(value).toFixed(4);
};

export const formatCoordinate = (value: Coordinate): string => {
  let x = value.x;
  let y = value.y;

  if (typeof x === "number") {
    x = formatDisplayValue(x);
  }

  if (typeof y === "number") {
    y = formatDisplayValue(y);
  }

  return `x: ${x} | y: ${y}`;
};
