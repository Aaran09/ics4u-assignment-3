import type { Coefficients, Coordinate, Results } from "@ics4u-assignment-03/types";
import { round } from "@ics4u-assignment-03/utils/round";

const displayNumber = (value: number): string => String(value);

const polynomialTerm = (coefficient: number, variable: string): string => {
  if (coefficient === 0) {
    return "";
  }

  if (coefficient < 0) {
    return ` - ${round(Math.abs(coefficient))}${variable}`;
  }

  return ` + ${round(coefficient)}${variable}`;
};

export const solveCubic = ({ a, b, c, d }: Coefficients): Results => {
  const none: Coordinate = { x: "N/A", y: "N/A" };
  const results: Results = {
    discriminant: round(0),
    equation: "N/A",
    factored: "No real factorization",
    firstDerivative: "N/A",
    maximum: none,
    minimum: none,
    p: round(0),
    q: round(0),
    r1: none,
    r2: none,
    r3: none,
    roots: "N/A",
    secondDerivative: "N/A",
  };

  // Not a cubic, so there is nothing to solve
  if (a === 0) {
    return results;
  }

  results.equation = `${round(a)}x³${polynomialTerm(b, "x²")}${polynomialTerm(c, "x")}${polynomialTerm(d, "")}`;
  results.firstDerivative = `${round(3 * a)}x²${polynomialTerm(2 * b, "x")}${polynomialTerm(c, "")}`;
  results.secondDerivative = `${round(6 * a)}x${polynomialTerm(2 * b, "")}`;

  const h = -b / (3 * a);
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

  results.p = p;
  results.q = q;
  results.discriminant = discriminant;

  if (discriminant < 0) {
    const theta = Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3;
    const rootFormula = 2 * Math.sqrt(-p / 3);
    const roots = [
      rootFormula * Math.cos(theta) + h,
      rootFormula * Math.cos(theta + (2 * Math.PI) / 3) + h,
      rootFormula * Math.cos(theta + (4 * Math.PI) / 3) + h,
    ];

    results.r1 = { x: roots[0], y: 0 };
    results.r2 = { x: roots[1], y: 0 };
    results.r3 = { x: roots[2], y: 0 };
    results.roots = "3 Real Roots, 0 Complex Roots";
    results.factored = `(x - ${displayNumber(roots[0])})(x - ${displayNumber(roots[1])})(x - ${displayNumber(roots[2])})`;
  } else if (discriminant > 0) {
    // Cardano for the real root other 2 are complex
    const discriminantRoot = Math.sqrt(discriminant);
    const realRoot = Math.cbrt(-q / 2 + discriminantRoot) + Math.cbrt(-q / 2 - discriminantRoot) + h;

    results.r1 = { x: realRoot, y: 0 };
    results.r2 = { x: "Imaginary", y: "Imaginary" };
    results.r3 = { x: "Imaginary", y: "Imaginary" };
    results.roots = "1 Real Root, 2 Complex Roots";
    results.factored = "No real factorization";
  } else if (p === 0 && q === 0) {
    // Cardano gives the triple root
    const tripleRoot = Math.cbrt(-q / 2) + Math.cbrt(-q / 2) + h;

    results.r1 = { x: tripleRoot, y: 0 };
    results.r2 = { x: tripleRoot, y: 0 };
    results.r3 = { x: tripleRoot, y: 0 };
    results.roots = "3 Real Roots, 0 Complex Roots";
    results.factored = `(x - ${displayNumber(tripleRoot)})³`;
  } else {
    // Cardano gives the double root
    const doubleRoot = -Math.cbrt(-q / 2) + h;
    const singleRoot = -Math.cbrt(4 * q) + h;

    results.r1 = { x: doubleRoot, y: 0 };
    results.r2 = { x: doubleRoot, y: 0 };
    results.r3 = { x: singleRoot, y: 0 };
    results.roots = "3 Real Roots, 0 Complex Roots";
    results.factored = `(x - ${displayNumber(doubleRoot)})²(x - ${displayNumber(singleRoot)})`;
  }

  const derivativeDiscriminant = 4 * b * b - 12 * a * c;
  if (derivativeDiscriminant > 0) {
    const root = Math.sqrt(derivativeDiscriminant);
    const x1 = (-2 * b - root) / (6 * a);
    const x2 = (-2 * b + root) / (6 * a);
    const pointOne: Coordinate = {
      x: x1,
      y: a * x1 ** 3 + b * x1 ** 2 + c * x1 + d,
    };
    const pointTwo: Coordinate = {
      x: x2,
      y: a * x2 ** 3 + b * x2 ** 2 + c * x2 + d,
    };

    results.maximum = a > 0 ? pointOne : pointTwo;
    results.minimum = a > 0 ? pointTwo : pointOne;
  }

  return results;
};
