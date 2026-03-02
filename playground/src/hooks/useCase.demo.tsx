import { useState } from "react";
import { useCase } from "use-re-hooks";

export const meta = {
  id: "useCase",
  title: "useCase",
  description: "Converts strings to camelCase and snake_case.",
};

export default function UseCaseDemo() {
  const [text, setText] = useState("EquipmentClass name");
  const { toCamelCase, toSnakeCase } = useCase();

  return (
    <div className="demo">
      <label htmlFor="case-input">Text</label>
      <input
        id="case-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter text to transform"
      />

      <p>
        <strong>camelCase:</strong> <code>{toCamelCase(text)}</code>
      </p>
      <p>
        <strong>snake_case:</strong> <code>{toSnakeCase(text)}</code>
      </p>
    </div>
  );
}
