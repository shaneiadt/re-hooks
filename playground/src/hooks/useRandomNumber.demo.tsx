import { useState } from "react";
import { useRandomNumber } from "use-re-hooks";

export const meta = {
  id: "useRandomNumber",
  title: "useRandomNumber",
  description: "Generates a random integer between min and max (inclusive).",
};

export default function UseRandomNumberDemo() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(69);
  const [seed, setSeed] = useState(0);

  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 0;
  const low = Math.min(safeMin, safeMax);
  const high = Math.max(safeMin, safeMax);

  return (
    <div className="demo">
      <label htmlFor="random-min">Min</label>
      <input
        id="random-min"
        type="number"
        value={min}
        onChange={(event) => setMin(Number(event.target.value))}
      />

      <label htmlFor="random-max">Max</label>
      <input
        id="random-max"
        type="number"
        value={max}
        onChange={(event) => setMax(Number(event.target.value))}
      />

      <button
        type="button"
        onClick={() => setSeed((current) => current + 1)}
      >
        Reroll
      </button>

      <p>
        <strong>Range:</strong> {low} to {high}
      </p>
      <RandomValue key={seed} min={low} max={high} />
    </div>
  );
}

function RandomValue({ min, max }: { min: number; max: number }) {
  const { value } = useRandomNumber({ min, max });

  return (
    <p>
      <strong>Result:</strong> <code>{value}</code>
    </p>
  );
}
