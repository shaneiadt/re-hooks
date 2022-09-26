interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: 'unspecified' | 'inline' | 'attachment';
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new (itemData: ClipboardItemData): ClipboardItem;
};

let anyNavigator: any;

anyNavigator = window.navigator;

export interface ImageItem {
  url: string;
}

export interface TextItem {
  text: string;
}

export const useClipboard = () => {
  const addToClipboard = async (item: ImageItem | TextItem) => {
    try {
      let blob;

      if ('url' in item) {
        const data = await fetch(item.url);
        blob = await data.blob();
      } else {
        blob = new Blob([item.text], { type: 'text/plain' });
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
