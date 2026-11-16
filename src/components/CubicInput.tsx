import { round } from "@ics4u-assignment-03/utils";
import type { SyntheticEvent } from "react";

type CubicInputProps = {
  a: number;
  b: number;
  c: number;
  d: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
  setC: (value: number) => void;
  setD: (value: number) => void;
  onSave: () => void;
};

export const CubicInput = ({ a, b, c, d, setA, setB, setC, setD, onSave }: CubicInputProps) => {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave();
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] p-6 shadow-2xl">
      <div className="absolute top-0 left-0 h-full w-1 bg-cyan-500" />
      <form className="flex flex-wrap items-center justify-between gap-6" id="form" onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-wrap justify-start gap-4 sm:gap-6">
          <label className="group flex flex-col gap-1.5">
            <span className="font-mono text-slate-500 text-xs transition group-focus-within:text-cyan-400">a-value [x³]</span>
            <input
              className="w-24 rounded-md border border-slate-800 bg-[#121824] px-3 py-2 text-center font-mono text-white transition focus:border-cyan-500 focus:outline-none"
              id="a"
              name="a"
              onChange={(event) => setA(round(Number(event.target.value)))}
              type="number"
              value={round(a)}
            />
          </label>
          <label className="group flex flex-col gap-1.5">
            <span className="font-mono text-slate-500 text-xs transition group-focus-within:text-cyan-400">b-value [x²]</span>
            <input
              className="w-24 rounded-md border border-slate-800 bg-[#121824] px-3 py-2 text-center font-mono text-white transition focus:border-cyan-500 focus:outline-none"
              id="b"
              name="b"
              onChange={(event) => setB(round(Number(event.target.value)))}
              type="number"
              value={round(b)}
            />
          </label>
          <label className="group flex flex-col gap-1.5">
            <span className="font-mono text-slate-500 text-xs transition group-focus-within:text-cyan-400">c-value [x]</span>
            <input
              className="w-24 rounded-md border border-slate-800 bg-[#121824] px-3 py-2 text-center font-mono text-white transition focus:border-cyan-500 focus:outline-none"
              id="c"
              name="c"
              onChange={(event) => setC(round(Number(event.target.value)))}
              type="number"
              value={round(c)}
            />
          </label>
          <label className="group flex flex-col gap-1.5">
            <span className="font-mono text-slate-500 text-xs transition group-focus-within:text-cyan-400">d-value [c]</span>
            <input
              className="w-24 rounded-md border border-slate-800 bg-[#121824] px-3 py-2 text-center font-mono text-white transition focus:border-cyan-500 focus:outline-none"
              id="d"
              name="d"
              onChange={(event) => setD(round(Number(event.target.value)))}
              type="number"
              value={round(d)}
            />
          </label>
        </div>
        <button
          className="w-full cursor-pointer self-end rounded-md bg-cyan-500 px-6 py-3 text-center font-bold font-mono text-[#07090e] text-xs tracking-wider shadow-cyan-500/10 shadow-lg transition duration-150 hover:bg-cyan-400 active:scale-95 sm:w-auto sm:self-auto"
          id="save"
          type="submit"
        >
          SAVE
        </button>
      </form>
    </section>
  );
};
