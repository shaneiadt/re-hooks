import { RefObject, useCallback, useEffect } from "react";

/**
 * Attaches a change listener to a file input and reads the first selected file
 * as text.
 *
 * When a file is selected, the hook calls the optional callback with the
 * file contents.
 *
 * @param ref - Ref pointing to an `<input type="file">` element
 * @param callback - Optional callback invoked with the selected file text
 * @returns An empty object
 *
 * @example
 * ```tsx
 * const inputRef = useRef<HTMLInputElement>(null);
 *
 * useFile(inputRef, (text) => {
 *   console.log(text);
 * });
 * ```
 */
export const useFile = (
  ref: RefObject<HTMLInputElement>,
  callback?: (text: string) => void,
) => {
  const onChange = useCallback(async () => {
    if (!ref.current?.files) return;

    const file = ref.current?.files[0];

    if (file) {
      const text = await file.text();
      if (callback) {
        callback(text);
      }
    }
  }, [callback, ref]);

  useEffect(() => {
    if (!ref) return;

    ref.current?.addEventListener("change", onChange);
  }, [ref, onChange]);

  return {};
};
