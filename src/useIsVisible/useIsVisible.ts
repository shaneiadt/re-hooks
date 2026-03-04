import {
  type RefCallback,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface UseIsVisibleOptions extends IntersectionObserverInit {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Custom hook to detect when an element is visible in the viewport.
 * Uses IntersectionObserver API for efficient visibility detection.
 * Continuously tracks visibility - toggles true/false as element enters/exits viewport.
 *
 * @param options - IntersectionObserver configuration options
 * @returns A tuple containing [elementRef, isVisible, reset]
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [ref, isVisible] = useIsVisible({ threshold: 0.5 });
 *
 *   useEffect(() => {
 *     if (isVisible) {
 *       fetchData();
 *     }
 *   }, [isVisible]);
 *
 *   return <div ref={ref}>Content</div>;
 * }
 * ```
 */
export function useIsVisible(
  options: Readonly<UseIsVisibleOptions> = {},
): [RefCallback<HTMLElement>, boolean, () => void] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [element, setElement] = useState<HTMLElement | null>(null);
  const { threshold = 0.1, root = null, rootMargin = "0px" } = options;

  const reset = useCallback(() => {
    setIsVisible(false);
  }, []);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, root, rootMargin, threshold]);

  return [ref, isVisible, reset];
}
