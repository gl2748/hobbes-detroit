import { HobGrid } from "@components/HobGrid";
import styled from "@emotion/styled";
import breakpoints from "../../breakpoints";

import { HobMarkdown } from "@components/HobMarkdown";
import React from "react";

const Text = styled(HobGrid)`
  padding: 1.25rem 6.625rem;

  ${breakpoints.mobile} {
    padding: 1.25rem;
  }

  &.module-text-area {
    &--one {
      padding: 4.125rem 0;
      ${breakpoints.mobile} {
        padding: 0;
      }
      .hob-grid__item {
        width: 50vw;
        height: auto;
        margin: 0 auto;

        ${breakpoints.mobile} {
          width: 100%;
          height: 100%;
          padding: 1.25rem;
        }
      }
    }
  }
`;

interface Props {
  text: string | string[];
}

export const TextArea = React.memo<Props>(
  ({ text }) => {
    const columns = Array.isArray(text) ? text : [text];
    return (
      <Text
        className={`module-text-area module-text-area--${
          columns.length > 1 ? "many" : "one"
        }`}
      >
        {columns.map(column => (
          <HobMarkdown source={column} key={column.slice(0, 50)} />
        ))}
      </Text>
    );
  },
  ({ text: a }, { text: b }) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length && a.every((column: string, i) => column === b[i])
      );
    }
    return a === b;
  }
);
