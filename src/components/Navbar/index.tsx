import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import { HobLink as Link } from "../HobLink";

const Nav = styled.div`
  --fs: 1.75rem;
  transform: translateZ(0);
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  display: flex;
  right: 1.5rem;
  top: 1.5rem;
  position: absolute;
  z-index: 5;

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

export const Navbar: React.FC<
  HTMLProps<HTMLDivElement> & {
    forwardedRef?: React.Ref<HTMLDivElement>;
  }
> = ({ className = "", children, forwardedRef }) => {
  return (
    <Nav className={className} ref={forwardedRef}>
      {children || (
        <>
          <Link color="secondary" href="/#work">
            Work
          </Link>
          <Link color="secondary" href="#studio">
            Studio
          </Link>
        </>
      )}
    </Nav>
  );
};
