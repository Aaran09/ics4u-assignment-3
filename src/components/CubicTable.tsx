import type { Coefficients, History, Results } from "@ics4u-assignment-03/types";
import { formatCoordinate, round } from "@ics4u-assignment-03/utils";

type CubicTableProps = {
  history: History;
  results: Results | null;
  onDelete: (coefficients: Coefficients) => void;
};

export const CubicTable = ({ history, results, onDelete }: CubicTableProps) => {
  return (
    <>
      <section className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"01 // ANALYSIS"}</h2>
        </div>
        <div className="space-y-1 font-mono text-xs">
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[p] parameter</span>
            <span className="font-medium text-slate-200">{results ? round(results.p) : "N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[q] parameter</span>
            <span className="font-medium text-slate-200">{results ? round(results.q) : "N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[Δ] discriminant</span>
            <span className="font-bold text-amber-400 tracking-wide">{results ? round(results.discriminant) : "N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[r1] root alpha</span>
            <span className="text-emerald-400">{results ? formatCoordinate(results.r1) : "x: N/A | y: N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[r2] root beta</span>
            <span className="text-emerald-400">{results ? formatCoordinate(results.r2) : "x: N/A | y: N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[r3] root gamma</span>
            <span className="text-emerald-400">{results ? formatCoordinate(results.r3) : "x: N/A | y: N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[min] critical point</span>
            <span className="text-cyan-400">{results ? formatCoordinate(results.minimum) : "x: N/A | y: N/A"}</span>
          </div>
          <div className="flex items-center justify-between border-slate-900 border-b px-1 py-3 transition hover:bg-slate-900/30">
            <span className="text-slate-500">[max] critical point</span>
            <span className="text-purple-400">{results ? formatCoordinate(results.maximum) : "x: N/A | y: N/A"}</span>
          </div>
        </div>
      </section>
      <section className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"02 // SUMMARY"}</h2>
        </div>
        <div className="space-y-1 font-mono text-xs">
          <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">f(x) expanded polynomial</span>
            <span className="break-all text-slate-200 text-sm tracking-wide">{results?.equation ?? "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">f'(x) first derivative</span>
            <span className="break-all text-cyan-400 text-sm tracking-wide">{results?.firstDerivative ?? "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">f''(x) second derivative</span>
            <span className="break-all text-purple-400 text-sm tracking-wide">{results?.secondDerivative ?? "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">roots</span>
            <span className="break-all text-emerald-400 text-sm tracking-wide">{results?.roots ?? "N/A"}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-slate-900 bg-[#0b0f19]/40 p-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">factored form</span>
            <span className="wrap-break-word pt-1 text-left text-sm text-white tracking-wide">{results?.factored ?? "N/A"}</span>
          </div>
        </div>
      </section>
      <section className="flex max-h-140 flex-col space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="font-bold font-mono text-slate-500 text-xs uppercase tracking-widest">{"03 // HISTORY"}</h2>
        </div>
        <ul className="custom-scrollbar flex-1 space-y-2 overflow-y-auto pr-2 font-mono text-slate-400 text-xs" id="history">
          {history.map((entry) => (
            <li className="flex items-center gap-2 bg-transparent" key={`${entry.a}-${entry.b}-${entry.c}-${entry.d}`}>
              <button
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/40 p-3 text-left transition hover:bg-slate-800/70"
                onClick={() => onDelete(entry)}
                type="button"
              >
                <div className="grid grid-cols-4 font-mono text-slate-200 text-sm">
                  <span className="text-center">{round(entry.a)}</span>
                  <span className="text-center">{round(entry.b)}</span>
                  <span className="text-center">{round(entry.c)}</span>
                  <span className="text-center">{round(entry.d)}</span>
                </div>
              </button>
              <button
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-medium font-mono text-red-400 text-xs transition hover:bg-red-500/20 hover:text-red-300"
                onClick={() => onDelete(entry)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
