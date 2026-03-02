import { useState } from "react";
import { useDebounce } from "use-re-hooks";

export const meta = {
  id: "useDebounce",
  title: "useDebounce",
  description: "Delays value updates while the input is changing rapidly.",
};

export default function UseDebounceDemo() {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 400);

  return (
    <div className="demo">
      <label htmlFor="debounced-input">Type quickly</label>
      <input
        id="debounced-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Try typing..."
      />
      <p>
        <strong>Immediate:</strong> {input || "(empty)"}
      </p>
      <p>
        <strong>Debounced:</strong> {debounced || "(empty)"}
      </p>
    </div>
  );
}
