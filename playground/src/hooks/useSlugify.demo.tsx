import { useState } from "react";
import { useSlugify } from "use-re-hooks";

export const meta = {
  id: "useSlugify",
  title: "useSlugify",
  description: "Converts text into URL-friendly slugs and stores generated entries.",
};

export default function UseSlugifyDemo() {
  const { slugify, slugs } = useSlugify();
  const [text, setText] = useState("Crème brûlée & hot coffee");
  const [latestSlug, setLatestSlug] = useState("");

  const createSlug = () => {
    setLatestSlug(slugify(text));
  };

  return (
    <div className="demo">
      <label htmlFor="slugify-text">Text</label>
      <input
        id="slugify-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <button type="button" onClick={createSlug}>
        Slugify
      </button>

      <p>
        <strong>Latest:</strong> <code>{latestSlug || "(none yet)"}</code>
      </p>

      <p>
        <strong>Stored slugs:</strong> <code>{Object.keys(slugs).length}</code>
      </p>
      {Object.entries(slugs).map(([key, value]) => (
        <p key={key}>
          <code>{key}</code> -&gt; <code>{value}</code>
        </p>
      ))}
    </div>
  );
}
