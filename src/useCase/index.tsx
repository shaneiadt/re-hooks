export const useCase = () => {
  const toCamelCase = (text: string): string =>
    text
      .replace(/\s(.)/g, c => c.toUpperCase())
      .replace(/^(.)/, c => c.toLowerCase())
      .replace(/\s/g, '');

  const toSnakeCase = (text: string): string =>
    text
      .trim()
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');

  return {
    toSnakeCase,
    toCamelCase,
  };
};
