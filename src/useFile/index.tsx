import { RefObject, useCallback, useEffect } from 'react';

export const useFile = (
  ref: RefObject<HTMLInputElement>,
  callback?: (reader: FileReader) => void
) => {
  const fileReader = new FileReader();

  const onChange = useCallback(() => {
    if (!ref.current?.files) return;

    const file = ref.current?.files[0];

    if (file) {
      if (callback) {
        fileReader.addEventListener('load', () => callback(fileReader));
      }

      fileReader.readAsText(file);
    }
  }, [callback, fileReader, ref]);

  useEffect(() => {
    if (!ref) return;

    ref.current?.addEventListener('change', onChange);
  }, [ref, onChange]);

  return {
    fileReader,
  };
};
