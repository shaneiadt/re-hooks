import { useState } from 'react';

type Slugs = Record<string, string>;

const charsA =
  'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
const charsB =
  'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';

const regEx = new RegExp(charsA.split('').join('|'), 'g');

export const useSlugify = () => {
  const [slugs, setSlugs] = useState<Slugs>({});

  const slugify = (text: string): string => {
    const slug = text
      .toString()
      .toLowerCase()
      .replace(regEx, c => charsB.charAt(charsA.indexOf(c)))
      .replace(/\s+/g, '-')
      .replace(/^-+/, '')
      .replace(/&/g, '-and-')
      .replace(/\-\-+/g, '-')
      .replace(/-+$/, '')
      .replace(/[^\w\-]+/g, '');

    setSlugs({ ...slugs, [text]: slug });

    return slug;
  };

  return {
    slugs,
    slugify,
  };
};
