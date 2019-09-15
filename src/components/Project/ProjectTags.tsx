import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import _ from "lodash";
import React, { ReactElement } from "react";
import breakpoints from "../../breakpoints";

const Container = styled.ul`
  padding-top: 2.875rem;
  display: flex;
  width: 50%;
  margin: 0 auto;

  ${breakpoints.mobile} {
    width: 100%;
    height: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  & + .module-text-area {
    padding-top: 1.25rem !important;

    ${breakpoints.mobile} {
      padding-top: 0 !important;
    }
  }

  li {
    border-bottom: 1px solid var(--hob-color--primary);
    padding-bottom: 0.375rem;
    .hob-typography {
      font-size: 0.875rem;
    }
  }

  > * {
    margin-right: 0.5rem;

    &:last-of-type {
      margin-right: none;
    }
  }
`;

export const ProjectTags = ({ tags }: { tags: string[] }): ReactElement => (
  <Container className="tags">
    {tags.map(tag => (
      <li key={tag}>
        <HobTypography variant="caption">{_.kebabCase(tag)}</HobTypography>
      </li>
    ))}
  </Container>
);
