import { useLayoutEffect, useRef } from "react";

// Stolen from here: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj

interface IPosition {
  x: number;
  y: number;
}

type TEffect = ({  }: { prevPos: IPosition; currPos: IPosition }) => void;

// Importantly this will work for SSR.
const isBrowser = typeof window !== `undefined`;

function getScrollPosition({
  element,
  useWindow
}: {
  element: undefined | React.RefObject<any>;
  useWindow: boolean | undefined;
}) {
  if (!isBrowser) {
    return { x: 0, y: 0 };
  }

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

export function useScrollPosition(
  effect: TEffect,
  {
    deps,
    element,
    useWindow,
    wait
  }: {
    deps?: any[];
    element?: React.RefObject<any>;
    useWindow?: boolean;
    wait?: number;
  } = {}
) {
  const position = useRef(getScrollPosition({ element, useWindow }));

  let throttleTimeout: NodeJS.Timeout | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, deps);
}
