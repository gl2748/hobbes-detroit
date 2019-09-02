import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { HobLink as Link } from "../HobLink";

const Nav = styled.div`
  --mb: 1.5rem;
  --fs: 1.75rem;

  z-index: 1;
  display: flex;
  right: 0;
  margin-right: 1.25rem;
  background-color: var(--hob-color--primary);

  &.nav {
    &--fixed {
      position: fixed;
    }

    &--absolute {
      position: absolute;
    }

    &--top {
      top: 0;
      margin-top: var(--mb);
    }

    &--bottom {
      top: calc(100vh - var(--mb) - var(--fs));
      margin-bottom: var(--mb);
    }
  }

  .hob-link {
    margin-right: 1rem;

    &:last-of-type {
      margin-right: 0;
    }
    &,
    .hob-typography--link {
      font-size: var(--fs);
    }
  }
`;

export const Navbar: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [window]);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setOffset(currPos.y * -1);
    },
    [],
    undefined,
    false,
    300
  );

  // relative to margin and bottom/top values in css
  const atTop = offset >= windowHeight - 1.5 * 16 - 2 * (1.75 * 16);
  const modifiers = Object.entries({
    fixed: { test: atTop, whenFalse: "absolute" },
    top: { test: atTop, whenFalse: "bottom" }
  })
    .map(([key, { test, whenFalse }]) => `nav--${test ? key : whenFalse}`)
    .join(" ");

  return (
    <Nav className={`nav ${modifiers}`}>
      <Link color="secondary" href="#work">
        Work
      </Link>
      <Link color="secondary" href="#studio">
        Studio
      </Link>
    </Nav>
  );
};
