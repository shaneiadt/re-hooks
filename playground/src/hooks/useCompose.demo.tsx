import { useMemo, useState } from "react";
import { useCompose } from "use-re-hooks";

export const meta = {
  id: "useCompose",
  title: "useCompose",
  description: "Composes functions from right to left.",
};

export default function UseComposeDemo() {
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

  const { result } = useCompose<number>(fns);

  return (
    <div className="demo">
      <label htmlFor="compose-seed">Seed</label>
      <input
        id="compose-seed"
        type="number"
        value={seed}
        onChange={(event) => setSeed(Number(event.target.value))}
      />

      <label htmlFor="compose-add">Add</label>
      <input
        id="compose-add"
        type="number"
        value={add}
        onChange={(event) => setAdd(Number(event.target.value))}
      />

      <label htmlFor="compose-multiply">Multiply</label>
      <input
        id="compose-multiply"
        type="number"
        value={multiplier}
        onChange={(event) => setMultiplier(Number(event.target.value))}
      />

      <label htmlFor="compose-subtract">Subtract</label>
      <input
        id="compose-subtract"
        type="number"
        value={subtract}
        onChange={(event) => setSubtract(Number(event.target.value))}
      />

      <p>
        <strong>Order:</strong>{" "}
        <code>f1(f2(f3(null))) with f3 -&gt; f2 -&gt; f1</code>
      </p>
      <p>
        <strong>Result:</strong> <code>{String(result)}</code>
      </p>
    </div>
  );
}
