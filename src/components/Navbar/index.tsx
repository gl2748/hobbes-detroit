import styled from "@emotion/styled";
import React, { HTMLProps } from "react";
import { HobLink as Link } from "../HobLink";

const Nav2 = styled.div`
  --fs: 1.75rem;
  display: flex;
  right: 1.5rem;
  top: 1.5rem;
  position: fixed;
  z-index: 5;
`;

const Nav = styled.div`
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
