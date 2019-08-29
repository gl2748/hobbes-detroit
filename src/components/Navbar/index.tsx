import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { HobLink as Link } from "../HobLink";

const Nav = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  bottom: 0;
  right: 0;
  margin-bottom: 1.5rem;
  margin-right: 1.25rem;

  .hob-link {
    margin-right: 1rem;
    &,
    .hob-typography--link {
      font-size: 1.75rem;
    }
  }
`;

interface IBlad {
  offset: number;
}
const OnDark = styled.div<IBlad>``;

const OnLight = styled.div<IBlad>``;

export const Navbar: React.FC = () => {
  const {
    scrollingElement,
    documentElement: { clientHeight }
  } = document;
  const { innerHeight } = window;
  const [offset, setOffset] = useState(
    (scrollingElement || { scrollTop: 0 }).scrollTop
  );
  const checkScroll = ({ target }: Event) => {
    if (target) {
      setOffset(target.scrollingElement.scrollTop);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  });
  return (
    <Nav>
      <OnDark offset={offset}>
        <Link color="secondary" href="#work">
          Work
        </Link>
        <Link color="secondary" href="#studio">
          Studio
        </Link>
      </OnDark>

      <OnLight offset={offset}>
        <Link color="primary" href="#work">
          Work
        </Link>
        <Link color="primary" href="#studio">
          Studio
        </Link>
      </OnLight>
    </Nav>
  );
};
