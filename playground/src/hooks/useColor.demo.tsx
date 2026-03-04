import { useMemo, useState } from "react";
import { useColor } from "use-re-hooks";

export const meta = {
  id: "useColor",
  title: "useColor",
  description: "Generates random colors and converts/fades color values.",
};

export default function UseColorDemo() {
  const { fadeColor, getRandomColor, hexToRgb, rgbToHex } = useColor();
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [fadeAmount, setFadeAmount] = useState(-24);

  const rgb = useMemo(() => hexToRgb(baseColor), [baseColor, hexToRgb]);
  const faded = useMemo(
    () => fadeColor(baseColor, fadeAmount),
    [baseColor, fadeAmount, fadeColor],
  );
  const reconstructed = useMemo(() => {
    if (!rgb) return "";
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }, [rgb, rgbToHex]);

  return (
    <div className="demo">
      <label htmlFor="color-base">Base color (hex)</label>
      <input
        id="color-base"
        value={baseColor}
        onChange={(event) => setBaseColor(event.target.value)}
      />

      <button type="button" onClick={() => setBaseColor(getRandomColor())}>
        Randomize
      </button>

      <label htmlFor="color-fade">Fade amount: {fadeAmount}</label>
      <input
        id="color-fade"
        type="range"
        min={-120}
        max={120}
        value={fadeAmount}
        onChange={(event) => setFadeAmount(Number(event.target.value))}
      />

      <p>
        <strong>Base:</strong> <code>{baseColor}</code>
      </p>
      <p>
        <strong>Faded:</strong> <code>{faded}</code>
      </p>
      <p>
        <strong>RGB:</strong>{" "}
        <code>{rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "invalid hex"}</code>
      </p>
      <p>
        <strong>RGB to HEX:</strong> <code>{reconstructed || "n/a"}</code>
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            border: "1px solid #c6d4e8",
            background: baseColor,
          }}
          title="Base color"
        />
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            border: "1px solid #c6d4e8",
            background: faded,
          }}
          title="Faded color"
        />
      </div>
    </div>
  );
}
