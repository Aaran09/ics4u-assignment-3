import { CubicGraph, CubicInput, CubicTable, Footer, Header } from "@ics4u-assignment-03/components";
import type { Coefficients, History } from "@ics4u-assignment-03/types";
import { solveCubic } from "@ics4u-assignment-03/utils";
import { useState } from "react";

const isSame = (first: Coefficients, second: Coefficients): boolean => {
  return first.a === second.a && first.b === second.b && first.c === second.c && first.d === second.d;
};

export const App = () => {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [d, setD] = useState<number>(0);
  const [history, setHistory] = useState<History>([]);

  const coefficients: Coefficients = { a, b, c, d };
  const results = solveCubic(coefficients);

  const handleSave = () => {
    // Duplicates are not allowed
    for (let i = 0; i < history.length; i++) {
      if (isSame(history[i], coefficients)) {
        return;
      }
    }

    setHistory([...history, coefficients]);
  };

  const handleDelete = (target: Coefficients) => {
    let remaining: History = [];

    for (let i = 0; i < history.length; i++) {
      if (!isSame(history[i], target)) {
        remaining = [...remaining, history[i]];
      }
    }

    setHistory(remaining);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16">
        <Header />
        <main className="space-y-12">
          <CubicInput a={a} b={b} c={c} d={d} onSave={handleSave} setA={setA} setB={setB} setC={setC} setD={setD} />
          <div className="grid grid-cols-2 gap-12">
            <CubicTable history={history} onDelete={handleDelete} results={results} />
            <CubicGraph coefficients={coefficients} results={results} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
