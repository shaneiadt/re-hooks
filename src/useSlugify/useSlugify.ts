import { useState } from "react";

type Slugs = Record<string, string>;

const charsA =
  "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
const charsB =
  "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";

const regEx = new RegExp(charsA.split("").join("|"), "g");

/**
 * Provides a slug generator and stores generated slugs keyed by input text.
 *
 * The slugification normalizes accented characters, replaces whitespace with
 * dashes, and strips unsupported characters.
 *
 * @returns The generated slug map and a slugify helper
 *
 * @example
 * ```ts
 * const { slugify } = useSlugify();
 *
 * slugify("Hello World");
 * ```
 */
export const useSlugify = () => {
  const [slugs, setSlugs] = useState<Slugs>({});

  const slugify = (text: string): string => {
    const slug = text
      .toString()
      .toLowerCase()
      .replace(regEx, (c) => charsB.charAt(charsA.indexOf(c)))
      .replaceAll(/\s+/g, "-")
      .replace(/^-+/, "")
      .replaceAll("&", "-and-")
      .replaceAll(/--+/g, "-")
      .replace(/-+$/, "")
      .replaceAll(/[^\w-]+/g, "");

    setSlugs({ ...slugs, [text]: slug });

    return slug;
  };

  return {
    slugs,
    slugify,
  };
};
