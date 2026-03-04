import { useMemo, useState } from "react";
import { usePipe } from "use-re-hooks";

export const meta = {
  id: "usePipe",
  title: "usePipe",
  description: "Pipes functions from left to right.",
};

export default function UsePipeDemo() {
  const [seed, setSeed] = useState(10);
  const [add, setAdd] = useState(5);
  const [multiplier, setMultiplier] = useState(2);
  const [subtract, setSubtract] = useState(3);

  const fns = useMemo(
    () => [
      (value: number | null) => (value ?? seed) + add,
      (value: number | null) => (value ?? seed) * multiplier,
      (value: number | null) => (value ?? seed) - subtract,
    ],
    [add, multiplier, seed, subtract],
  );

  const { result } = usePipe<number>(fns);

  return (
    <div className="demo">
      <label htmlFor="pipe-seed">Seed</label>
      <input
        id="pipe-seed"
        type="number"
        value={seed}
        onChange={(event) => setSeed(Number(event.target.value))}
      />

      <label htmlFor="pipe-add">Add</label>
      <input
        id="pipe-add"
        type="number"
        value={add}
        onChange={(event) => setAdd(Number(event.target.value))}
      />

      <label htmlFor="pipe-multiply">Multiply</label>
      <input
        id="pipe-multiply"
        type="number"
        value={multiplier}
        onChange={(event) => setMultiplier(Number(event.target.value))}
      />

      <label htmlFor="pipe-subtract">Subtract</label>
      <input
        id="pipe-subtract"
        type="number"
        value={subtract}
        onChange={(event) => setSubtract(Number(event.target.value))}
      />

      <p>
        <strong>Order:</strong> <code>f3(f2(f1(null))) with f1 -&gt; f2 -&gt; f3</code>
      </p>
      <p>
        <strong>Result:</strong> <code>{String(result)}</code>
      </p>
    </div>
  );
}
