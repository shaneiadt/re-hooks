import { JSX, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type DemoMeta = {
  id: string;
  title: string;
  description?: string;
};

type DemoModule = {
  default: () => JSX.Element;
  meta: DemoMeta;
};

const modules = import.meta.glob<DemoModule>("./hooks/*.demo.tsx", {
  eager: true,
});

const demos = Object.values(modules)
  .map((module) => ({ Component: module.default, ...module.meta }))
  .sort((a, b) => a.title.localeCompare(b.title));

const getSelectedDemoId = () => {
  const fromQuery = new URLSearchParams(globalThis.location.search).get("hook");
  if (fromQuery && demos.some((demo) => demo.id === fromQuery)) {
    return fromQuery;
  }
  return demos[0]?.id;
};

function App() {
  const selectedId = getSelectedDemoId();
  const selectedDemo = demos.find((demo) => demo.id === selectedId);

  return (
    <main className="app">
      <aside className="sidebar">
        <h1>re-hooks</h1>
        <nav>
          {demos.map((demo) => (
            <a
              key={demo.id}
              className={demo.id === selectedId ? "active" : undefined}
              href={`?hook=${encodeURIComponent(demo.id)}`}
            >
              {demo.title}
            </a>
          ))}
        </nav>
      </aside>

      <section className="panel">
        {selectedDemo ? (
          <>
            <h2>{selectedDemo.title}</h2>
            {selectedDemo.description ? (
              <p className="description">{selectedDemo.description}</p>
            ) : null}
            <selectedDemo.Component />
          </>
        ) : (
          <p>No demo found.</p>
        )}
      </section>
    </main>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
