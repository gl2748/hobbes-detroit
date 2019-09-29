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
  const getBody = () => {
    return document.scrollingElement || document.documentElement;
  };

  const target = element && element.current ? element.current : getBody();

  console.log("target", target);

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: target.scrollLeft, y: target.scrollTop }; // this one
}

export function useScrollPosition(
  effect: TEffect,
  {
    deps,
    element,
    useWindow = true,
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

    const target =
      !useWindow && element && element.current ? element.current : window;
    target.addEventListener("scroll", handleScroll);

    return () => target.removeEventListener("scroll", handleScroll);
  }, deps);
}
