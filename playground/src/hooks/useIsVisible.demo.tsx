import { useCallback, useState } from "react";
import { useIsVisible } from "use-re-hooks";

export const meta = {
  id: "useIsVisible",
  title: "useIsVisible",
  description: "Tracks element visibility inside a scroll container.",
};

export default function UseIsVisibleDemo() {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [targetRef, isVisible, reset] = useIsVisible({
    root,
    threshold: 0.7,
  });

  const rootRef = useCallback((node: HTMLDivElement | null) => {
    setRoot(node);
  }, []);

  return (
    <div className="demo">
      <p>
        <strong>Visible:</strong> <code>{String(isVisible)}</code>
      </p>

      <div
        ref={rootRef}
        style={{
          height: 240,
          overflowY: "auto",
          border: "1px solid #c6d4e8",
          borderRadius: 10,
          padding: 12,
          background: "#f8fbff",
        }}
      >
        <div style={{ height: 180 }}>Scroll down inside this container</div>
        <div
          ref={targetRef as (node: HTMLDivElement | null) => void}
          style={{
            height: 80,
            borderRadius: 10,
            border: "1px solid #88a5d2",
            background: isVisible ? "#c9f3d1" : "#f5d0d0",
            display: "grid",
            placeItems: "center",
            fontWeight: 600,
          }}
        >
          Observed element
        </div>
        <div style={{ height: 200 }} />
      </div>

      <button type="button" onClick={reset}>
        Reset Visible Flag
      </button>
    </div>
  );
}
