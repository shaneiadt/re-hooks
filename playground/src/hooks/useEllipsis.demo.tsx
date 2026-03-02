import { useState } from "react";
import { EllipsisPosition, useEllipsis } from "use-re-hooks";

export const meta = {
  id: "useEllipsis",
  title: "useEllipsis",
  description: "Truncates strings at the start, middle, or end.",
};

const source =
  "https://github.com/shaneiadt/re-hooks/tree/main/src/useEllipsis/useEllipsis.ts";

export default function UseEllipsisDemo() {
  const [position, setPosition] = useState<EllipsisPosition>(
    EllipsisPosition.END,
  );
  const [length, setLength] = useState(24);
  const [count, setCount] = useState(3);
  const [text, setText] = useState(source);

  const { ellipsis } = useEllipsis({
    length,
    count,
    char: ".",
    position,
  });

  return (
    <div className="demo">
      <label htmlFor="ellipsis-text">Text</label>
      <input
        id="ellipsis-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <label htmlFor="ellipsis-length">Length: {length}</label>
      <input
        id="ellipsis-length"
        type="range"
        min={8}
        max={60}
        value={length}
        onChange={(event) => setLength(Number(event.target.value))}
      />

      <label htmlFor="ellipsis-count">Dots: {count}</label>
      <input
        id="ellipsis-count"
        type="range"
        min={1}
        max={6}
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}
      />

      <label htmlFor="ellipsis-position">Position</label>
      <select
        id="ellipsis-position"
        value={position}
        onChange={(event) => setPosition(event.target.value as EllipsisPosition)}
      >
        <option value={EllipsisPosition.START}>START</option>
        <option value={EllipsisPosition.MIDDLE}>MIDDLE</option>
        <option value={EllipsisPosition.END}>END</option>
      </select>

      <p>
        <strong>Result:</strong> <code>{ellipsis(text)}</code>
      </p>
    </div>
  );
}
