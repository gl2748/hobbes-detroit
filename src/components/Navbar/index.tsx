import styled from "@emotion/styled";
import React, { HTMLProps, useEffect, useState } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { HobLink as Link } from "../HobLink";

const Nav = styled.div`
  --fs: 1.75rem;

  display: flex;
  right: 1.5rem;
  top: 1.5rem;
  background-color: var(--hob-color--primary);
  position: fixed;
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

export const Navbar: React.FC<HTMLProps<HTMLDivElement>> = ({
  className = ""
}) => {
  return (
    <Nav className={className}>
      <Link color="secondary" href="/#work">
        Work
      </Link>
      <Link color="secondary" href="#studio">
        Studio
      </Link>
    </Nav>
  );
};
