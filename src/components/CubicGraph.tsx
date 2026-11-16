import type { Coefficients, Results } from "@ics4u-assignment-03/types";
import { drawGraph } from "@ics4u-assignment-03/utils";
import { useEffect, useRef } from "react";

type CubicGraphProps = {
  coefficients: Coefficients;
  results: Results;
};

export const CubicGraph = ({ coefficients, results }: CubicGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawGraph(coefficients, results, canvasRef.current);
    }
  }, [coefficients, results]);

  return (
    <section className="flex flex-col space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"04 // GRAPH"}</h2>
      </div>
      <div className="flex-1 rounded-xl border border-slate-900 bg-[#0b0f19]/50 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-size-[16px_16px] p-6 shadow-2xl">
        <canvas
          className="w-full rounded-md border border-slate-900 bg-[#04060a] shadow-inner"
          height={400}
          id="graph"
          ref={canvasRef}
          width={400}
        />
      </div>
    </section>
  );
};
