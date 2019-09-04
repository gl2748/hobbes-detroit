import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { HobLetters } from "../components/HobLetters";
import { HobLogo } from "../components/HobLogo";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { FeaturedProjectRollContainer } from "../containers/FeaturedProjectRollContainer";
import { ProjectRollContainer } from "../containers/ProjectRollContainer";
import { StudioContainer } from "../containers/StudioContainer";
import { useScrollPosition } from "../hooks/useScrollPosition";

const Container = styled(Layout)`
  --mb: 1.5rem;
  --fs: 1.75rem;

  .hob-letters {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    margin-left: 1.25rem;
    margin-top: 1.25rem;
  }

  > .hob-logo {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    margin-left: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .nav {
    z-index: 3;
    display: flex;
    right: 0;
    margin-right: 1.25rem;
    background-color: var(--hob-color--primary);

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

const IndexPage = () => {
  const [offset, setOffset] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useScrollPosition(({ prevPos, currPos }) => {
    setOffset(currPos.y * -1);
  });

  // relative to margin and bottom/top values in css
  const atTop = offset >= windowHeight - 1.5 * 16 - 2 * (1.75 * 16);
  const modifiers = Object.entries({
    fixed: { test: atTop, whenFalse: "absolute" },
    top: { test: atTop, whenFalse: "bottom" }
  })
    .map(([key, { test, whenFalse }]) => `nav--${test ? key : whenFalse}`)
    .join(" ");

  return (
    <Container>
      <Navbar className={`nav ${modifiers}`} />
      <HobLetters size="lg" color="var(--hob-color--light)" />
      <HobLogo fill="var(--hob-color--secondary)" />
      <FeaturedProjectRollContainer />
      <ProjectRollContainer />
      <StudioContainer />
    </Container>
  );
};

export default IndexPage;
