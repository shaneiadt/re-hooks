import { useState } from "react";

interface EllipsisOptions {
  char: string;
  length: number;
  count: number;
  text: string;
}

export enum EllipsisPosition {
  START = "START",
  MIDDLE = "MIDDLE",
  END = "END",
}

export interface UseEllipsisProps {
  length: number;
  count?: number;
  char?: string;
  position?: EllipsisPosition;
}

export const useEllipsis = ({
  length,
  count = 3,
  char = ".",
  position = EllipsisPosition.END,
}: Readonly<UseEllipsisProps>) => {
  const [options, setOptions] = useState<
    Pick<EllipsisOptions, "length" | "char" | "count"> & {
      position: EllipsisPosition;
    }
  >({
    length,
    count,
    char,
    position,
  });

  const ellipsis = (
    text: string,
    override?: Partial<UseEllipsisProps>,
  ): string => {
    const length = override?.length || options.length;
    const char = override?.char || options.char;
    const count = override?.count || options.count;
    const position = override?.position || options.position;

    const fn = getEllipsisFunction(position);

    return fn({ text, length, char, count });
  };

  const getEllipsisFunction = (
    position: EllipsisPosition,
  ): ((options: EllipsisOptions) => string) => {
    if (position === EllipsisPosition.START) {
      return ellipsisStart;
    }
    if (position === EllipsisPosition.MIDDLE) {
      return ellipsisMiddle;
    }
    return ellipsisEnd;
  };

  const getEllipsisChars = (count: number, char: string): string =>
    Array.from(new Array(count))
      .map(() => char)
      .join("");

  const ellipsisEnd = (options: EllipsisOptions): string => {
    const { text, char, length, count } = options;

    if (text.length - count <= length) return text;

    return `${text.substring(0, length - count)}${getEllipsisChars(
      count,
      char,
    )}`;
  };

  const ellipsisMiddle = (options: EllipsisOptions): string => {
    const { text, char, length, count } = options;

    const middle = getEllipsisChars(count, char);

    const totalLength = Math.ceil(length - middle.length);

    let startLength = totalLength / 2;
    let endLength = totalLength / 2;

    if (totalLength % 2 !== 0) {
      startLength = Math.ceil(totalLength / 2);
      endLength = Math.floor(totalLength / 2);
    }

    const start = text.substring(0, startLength);
    const end = text.substring(text.length - endLength, text.length);

    return `${start}${middle}${end}`;
  };

  const ellipsisStart = (options: EllipsisOptions): string => {
    const { text, char, length, count } = options;

    const ellipsisChars = getEllipsisChars(count, char);

    return `${ellipsisChars}${text.substring(
      text.length - (length - count),
      text.length,
    )}`;
  };

  return {
    ellipsis,
    setOptions,
  };
};
