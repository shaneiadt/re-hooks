import type { RefObject } from "react";
import { useRef, useState } from "react";
import { useFile } from "use-re-hooks";

export const meta = {
  id: "useFile",
  title: "useFile",
  description: "Reads selected file text content from an input element.",
};

export default function UseFileDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [contents, setContents] = useState("");
  useFile(inputRef as RefObject<HTMLInputElement>, setContents);

  return (
    <div className="demo">
      <label htmlFor="file-input">Select a text file</label>
      <input id="file-input" ref={inputRef} type="file" />

      <p>
        <strong>Length:</strong> <code>{contents.length}</code>
      </p>
      <p>
        <strong>Preview:</strong>{" "}
        <code>{contents ? contents.slice(0, 180) : "(no file loaded yet)"}</code>
      </p>
    </div>
  );
}
