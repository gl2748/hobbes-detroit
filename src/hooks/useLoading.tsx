import React from "react";

// Stolen from here: https://github.com/sw-yx/react-netlify-identity-widget/blob/master/src/useLoading.tsx

export default function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const mount = React.useRef(false);
  React.useEffect(() => {
    mount.current = true;
    return () => void (mount.current = false);
  }, []);
  function load<A>(aPromise: Promise<A>) {
    setState(true);
    return aPromise.finally(() => mount.current && setState(false));
  }
  return [isLoading, load] as [
    boolean,
    <A>(aPromise: Promise<A>) => Promise<A>
  ];
}
