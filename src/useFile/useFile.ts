import { RefObject, useCallback, useEffect } from "react";

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
