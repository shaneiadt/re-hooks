import { useState } from "react";
import { useClipboard } from "use-re-hooks";

export const meta = {
  id: "useClipboard",
  title: "useClipboard",
  description: "Copies plain text or fetched image data to the system clipboard.",
};

const sampleImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/SVG_Logo.svg/320px-SVG_Logo.svg.png";

export default function UseClipboardDemo() {
  const { addToClipboard } = useClipboard();
  const [text, setText] = useState("Copy me from re-hooks playground");
  const [imageUrl, setImageUrl] = useState(sampleImageUrl);
  const [message, setMessage] = useState("Idle");

  const clipboardSupported =
    typeof navigator !== "undefined" && !!navigator.clipboard?.write;
  const clipboardItemSupported = typeof ClipboardItem !== "undefined";

  const copyText = async () => {
    setMessage("Copying text...");
    await addToClipboard({ text });
    setMessage("Copy request sent for text.");
  };

  const copyImage = async () => {
    setMessage("Copying image...");
    await addToClipboard({ url: imageUrl });
    setMessage("Copy request sent for image.");
  };

  return (
    <div className="demo">
      <p>
        <strong>Clipboard API:</strong>{" "}
        <code>{clipboardSupported ? "available" : "not available"}</code>
      </p>
      <p>
        <strong>ClipboardItem:</strong>{" "}
        <code>{clipboardItemSupported ? "available" : "not available"}</code>
      </p>

      <label htmlFor="clipboard-text">Text</label>
      <input
        id="clipboard-text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="button" onClick={copyText} disabled={!clipboardSupported}>
        Copy Text
      </button>

      <label htmlFor="clipboard-image-url">Image URL</label>
      <input
        id="clipboard-image-url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
      <button
        type="button"
        onClick={copyImage}
        disabled={!clipboardSupported || !clipboardItemSupported}
      >
        Copy Image URL Content
      </button>

      <p>
        <strong>Status:</strong> <code>{message}</code>
      </p>
    </div>
  );
}
