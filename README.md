# Use-Re-Hooks

![CI](https://github.com/shaneiadt/re-hooks/actions/workflows/ci.yml/badge.svg)
![Publish](https://github.com/shaneiadt/re-hooks/actions/workflows/publish.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/use-re-hooks)
![npm downloads](https://img.shields.io/npm/dm/use-re-hooks)

"Potentially" Useful React hooks!

## Installation

```bash
npm install use-re-hooks
yarn add use-re-hooks
```

## Module Formats

This package ships both ESM and CommonJS entrypoints.

Use `import` in ESM projects, TypeScript projects, and modern bundlers:

```ts
import { useDebounce, useTimeout } from "use-re-hooks";
```

Use `require` in CommonJS projects:

```js
const { useDebounce, useTimeout } = require("use-re-hooks");
```

Package entrypoints:

- `import` resolves to `dist/index.js`
- `require` resolves to `dist/index.cjs`
- Type declarations resolve to `dist/index.d.ts`

## Usage

```tsx
import { useDebounce } from "use-re-hooks";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  return <input value={debouncedQuery} onChange={(event) => setQuery(event.target.value)} />;
}
```

## Hooks

### useCase

Converts strings between `camelCase` and `snake_case`.

Demo: [playground/src/hooks/useCase.demo.tsx](./playground/src/hooks/useCase.demo.tsx)

```ts
const { toCamelCase, toSnakeCase } = useCase();
```

### useClipboard

Writes text or image data to the system clipboard.

Demo: [playground/src/hooks/useClipboard.demo.tsx](./playground/src/hooks/useClipboard.demo.tsx)

```ts
const { addToClipboard } = useClipboard();
await addToClipboard({ text: "Copied text" });
```

### useColor

Generates random colors and converts between hex and RGB formats.

Demo: [playground/src/hooks/useColor.demo.tsx](./playground/src/hooks/useColor.demo.tsx)

```ts
const { getRandomColor, fadeColor, hexToRgb, rgbToHex } = useColor();
```

### useCompose

Composes functions from right to left and returns the computed result.

Demo: [playground/src/hooks/useCompose.demo.tsx](./playground/src/hooks/useCompose.demo.tsx)

```ts
const { result } = useCompose<number>([(value) => (value ?? 0) + 1, () => 10]);
```

### useDebounce

Returns a debounced version of a value after a delay.

Demo: [playground/src/hooks/useDebounce.demo.tsx](./playground/src/hooks/useDebounce.demo.tsx)

```ts
const debouncedValue = useDebounce(value, 300);
```

### useEllipsis

Shortens text from the start, middle, or end using configurable ellipsis rules.

Demo: [playground/src/hooks/useEllipsis.demo.tsx](./playground/src/hooks/useEllipsis.demo.tsx)

```ts
const { ellipsis } = useEllipsis({ length: 12 });
```

### useFile

Reads the first selected file from a file input as text.

Demo: [playground/src/hooks/useFile.demo.tsx](./playground/src/hooks/useFile.demo.tsx)

```tsx
const inputRef = useRef<HTMLInputElement>(null);
useFile(inputRef, (text) => console.log(text));
```

### useGeolocation

Requests the user's current location and exposes the request status.

Demo: [playground/src/hooks/useGeolocation.demo.tsx](./playground/src/hooks/useGeolocation.demo.tsx)

```ts
const { STATUS } = useGeolocation({
  success: (position) => console.log(position.coords.latitude),
});
```

### useIsVisible

Tracks whether an element is visible within the viewport or a scroll container.

Demo: [playground/src/hooks/useIsVisible.demo.tsx](./playground/src/hooks/useIsVisible.demo.tsx)

```tsx
const [ref, isVisible] = useIsVisible({ threshold: 0.5 });
```

### useMeasurePerformance

Measures how long synchronous functions take to execute.

Demo: [playground/src/hooks/useMeasurePerformance.demo.tsx](./playground/src/hooks/useMeasurePerformance.demo.tsx)

```ts
const { results, measure } = useMeasurePerformance({
  entries: [{ name: "task", func: () => heavyWork() }],
});
```

### useNotification

Requests browser notification permission and sends notifications.

Demo: [playground/src/hooks/useNotification.demo.tsx](./playground/src/hooks/useNotification.demo.tsx)

```ts
const { status, notify } = useNotification();
notify({ title: "Saved", body: "Changes saved." });
```

### usePipe

Pipes functions from left to right and returns the computed result.

Demo: [playground/src/hooks/usePipe.demo.tsx](./playground/src/hooks/usePipe.demo.tsx)

```ts
const { result } = usePipe<number>([() => 10, (value) => (value ?? 0) + 2]);
```

### useRandomNumber

Generates a random integer within an inclusive range.

Demo: [playground/src/hooks/useRandomNumber.demo.tsx](./playground/src/hooks/useRandomNumber.demo.tsx)

```ts
const { value } = useRandomNumber({ min: 1, max: 6 });
```

### useSlugify

Creates URL-friendly slugs and stores generated values by input text.

Demo: [playground/src/hooks/useSlugify.demo.tsx](./playground/src/hooks/useSlugify.demo.tsx)

```ts
const { slugify, slugs } = useSlugify();
```

### useTimeout

Schedules a one-shot callback after a delay while enabled.

Demo: [playground/src/hooks/useTimeout.demo.tsx](./playground/src/hooks/useTimeout.demo.tsx)

```ts
useTimeout(() => {
  console.log("done");
}, 1000, true);
```

### useWebWorker

Creates a Web Worker from a function and exposes helpers for messaging and status.

Demo: [playground/src/hooks/useWebWorker.demo.tsx](./playground/src/hooks/useWebWorker.demo.tsx)

```ts
const { postMessage, result, status } = useWebWorker<number, number>(() => {
  self.onmessage = (event) => {
    self.postMessage(event.data * 2);
  };
});
```
