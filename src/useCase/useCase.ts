/**
 * Provides helpers for converting strings between camelCase and snake_case.
 *
 * @returns Case conversion helpers
 *
 * @example
 * ```ts
 * const { toCamelCase, toSnakeCase } = useCase();
 *
 * toCamelCase("hello world");
 * toSnakeCase("helloWorld");
 * ```
 */
export const useCase = () => {
  const toCamelCase = (text: string): string =>
    text
      .replaceAll(/\s(.)/g, (c) => c.toUpperCase())
      .replace(/^(.)/, (c) => c.toLowerCase())
      .replaceAll(/\s/g, "");

  const toSnakeCase = (text: string): string =>
    text
      .trim()
      .replaceAll(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");

  return {
    toSnakeCase,
    toCamelCase,
  };
};
