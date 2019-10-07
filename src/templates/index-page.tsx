import styled from "@emotion/styled";
import { withLocation } from "@higherOrderComponents/withLocation";
import { LocationState } from "history";
import React, { useEffect, useReducer, useRef } from "react";
import { HobLetters } from "../components/HobLetters";
import { HobLogo } from "../components/HobLogo";
import { LayoutWithLocation } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { FeaturedProjectRollContainer } from "../containers/FeaturedProjectRollContainer";
import { ProjectRollContainer } from "../containers/ProjectRollContainer";
import { StudioContainer } from "../containers/StudioContainer";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { MemoizedLink } from "./MemoizedLink";
import { MemoizedLogo } from "./MemoizedLogo";

const Sticky = styled.div`
  &.not-sticky {
    display: flex;
    justify-content: flex-end;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    z-index: 99;
    background: black;
  }
  &.sticky {
    --fs: 1.75rem;
    display: flex;
    right: 1.5rem;
    top: 1.5rem;
    position: fixed;
    z-index: 5;
  }
`;

const Container = styled(LayoutWithLocation)`
  --mb: 1.5rem;
  --fs: 1.75rem;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  height: 100vh;

  &.main--work {
    .nav__item--Work {
      svg {
        text {
          text-decoration: underline;
        }
      }
    }
  }

  &.main--studio {
    .nav__item--Studio {
      svg {
        text {
          text-decoration: underline;
        }
      }
    }
  }

  > .hob-letters {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    margin-left: 1.25rem;
    margin-top: 1.25rem;
  }

  &--scrolled {
    > .logo svg {
      fill: none;
      stroke: var(--hob-color--light);
    }
  }

  > .logo {
    position: fixed;
    z-index: 1;
    left: 1.25rem;
    bottom: 1.25rem;

    &--scrolled {
      svg {
        fill: none;
        stroke: var(--hob-color--light);
      }
    }
  }

  #studio .hob-logo {
    svg {
      fill: var(--hob-color--dark);
    }
  }
`;

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface State {
  scrollY: number;
  positions: {
    studio: Position;
    nav: Position;
  };
  windowHeight: number;
  sticky: number;
}

const initialState: State = {
  positions: {
    nav: { bottom: 0, top: 0 },
    studio: { top: 0 }
  },
  scrollY: 0,
  sticky: 0,
  windowHeight: 0
};

type Action =
  | { type: "SET_STICKY"; payload: number }
  | { type: "SET_SCROLL_Y"; payload: number }
  | { type: "SET_WINDOW_HEIGHT"; payload: number }
  | { type: "SET_POSITIONS"; payload: { [key: string]: Position } };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SCROLL_Y": {
      return {
        ...state,
        scrollY: action.payload
      };
    }
    case "SET_WINDOW_HEIGHT": {
      return {
        ...state,
        windowHeight: action.payload
      };
    }
    case "SET_POSITIONS": {
      return {
        ...state,
        positions: {
          ...state.positions,
          ...action.payload
        }
      };
    }
    case "SET_STICKY": {
      return {
        ...state,
        sticky: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

const IndexPage = React.memo(
  ({ location: { hash } }: { location: LocationState }) => {
    const [
      {
        scrollY,
        windowHeight,
        positions: {
          nav: { bottom: navBottom = 1, top: navTop = 0 },
          studio: { top: studioTop = 0 }
        },
        sticky
      },
      dispatch
    ] = useReducer(reducer, initialState);

    const scrollRef = useRef<HTMLDivElement>(null);
    const studioRef = useRef<HTMLDivElement>(null);
    const navRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const stickyElement = document.getElementById("sticky");
      if (stickyElement) {
        const stickyOffsetTop = stickyElement.offsetTop;
        dispatch({ type: "SET_STICKY", payload: stickyOffsetTop });
      }
      dispatch({ type: "SET_WINDOW_HEIGHT", payload: window.innerHeight });
      if (hash !== "") {
        const el = document.getElementById(hash.replace(/#/, ""));
        if (el) {
          el.scrollIntoView();
        }
      }
    }, []);

    useScrollPosition(
      ({ currPos }: { currPos: { x: number; y: number } }) => {
        const stickyArea = document.getElementById("sticky");
        if (stickyArea) {
          if (currPos.y >= sticky) {
            stickyArea.classList.add("sticky");
            stickyArea.classList.remove("not-sticky");
          } else {
            stickyArea.classList.add("not-sticky");
            stickyArea.classList.remove("sticky");
          }
        }
      },
      {
        element: scrollRef,
        useWindow: false,
        wait: 300
      }
    );

    /*
    React.useEffect(() => {
      if (navRef.current === null || studioRef.current === null) {
        return;
      }
      // const navRect = navRef.current.getBoundingClientRect();
      // debugger
      dispatch({
        payload: {
          nav: {
            bottom: navRef.current.offsetHeight + navRef.current.offsetTop,
            top: navRef.current.offsetTop
          },
          studio: {
            top: studioRef.current.offsetTop
          }
        },
        type: "SET_POSITIONS"
      });
    }, [
      studioRef.current && studioRef.current.offsetTop,
      navRef.current && navRef.current.offsetTop
    ]);
    */

    /*
    const offset = Math.max(
      0,
      ((scrollY + navBottom - studioTop) / (navBottom - navTop)) * 100 || 0
    );
    const height = 28;
    */

    /*
    useScrollPosition(
      ({ currPos }) => {
        dispatch({ type: "SET_SCROLL_Y", payload: currPos.y });
      },
      {
        element: scrollRef,
        useWindow: false,
        wait: 100
      }
    );
    */

    // const atTop = scrollY >= windowHeight - 1.5 * 16 - 2 * (1.75 * 16);
    /*
    const modifiers = Object.entries({
      fixed: { test: atTop, whenFalse: "absolute" },
      top: { test: atTop, whenFalse: "bottom" }
    })
      .map(([key, { test, whenFalse }]) => `nav--${test ? key : whenFalse}`)
      .join(" ");
      */

    /*

    const section =
      scrollY === 0 ? "home" : scrollY < studioTop ? "work" : "studio";
*/

    return (
      <Container forwardedRef={scrollRef} className={`main`}>
        <HobLetters size="lg" color="var(--hob-color--light)" />
        <MemoizedLogo
          className={`logo logo--${scrollY > 0 ? "scrolled" : "top"}`}
          unsetTypography={true}
          color="primary"
          to="/"
        >
          <HobLogo fill="var(--hob-color--secondary)" />
        </MemoizedLogo>
        <FeaturedProjectRollContainer />
        <Sticky id={`sticky`} className={`not-sticky`}>
          <Navbar forwardedRef={navRef}>
            <MemoizedLink
              href="/#work"
              label="Work"
              color="secondary"
              height={28}
              offset={0}
            />
            <MemoizedLink
              href="#studio"
              label="Studio"
              color="secondary"
              height={28}
              offset={0}
            />
          </Navbar>
        </Sticky>
        <ProjectRollContainer />
        <StudioContainer forwardedRef={studioRef} />
      </Container>
    );
  },
  (a, b) =>
    a.location.path === b.location.path && a.location.hash === b.location.hash
);

export default withLocation(IndexPage);
