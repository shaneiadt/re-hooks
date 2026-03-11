interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: "unspecified" | "inline" | "attachment";
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>;
}

declare const ClipboardItem: {
  prototype: ClipboardItem;
  new (itemData: ClipboardItemData): ClipboardItem;
};

const anyNavigator: Navigator = globalThis.navigator;

export interface ImageItem {
  url: string;
}

export interface TextItem {
  text: string;
}

/**
 * Provides a helper for writing text or image data to the system clipboard.
 *
 * Image items are fetched first and then written as blobs. Text items are
 * written as plain text blobs.
 *
 * @returns Clipboard actions
 *
 * @example
 * ```ts
 * const { addToClipboard } = useClipboard();
 *
 * await addToClipboard({ text: "Copied text" });
 * ```
 */
export const useClipboard = () => {
  const addToClipboard = async (item: ImageItem | TextItem) => {
    try {
      let blob;

      if ("url" in item) {
        const data = await fetch(item.url);
        blob = await data.blob();
      } else {
        blob = new Blob([item.text], { type: "text/plain" });
      }

      await anyNavigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addToClipboard,
  };
};
