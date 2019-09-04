import styled from "@emotion/styled";
import React, { HTMLProps, ReactElement, ReactNode } from "react";

export interface IGridProps {
  children: ReactNode;
  padding?: number;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const HobGrid = ({
  children,
  className = "",
  padding = 0
}: IGridProps & HTMLProps<HTMLDivElement>): ReactElement => {
  const columns: ReactNode[] = Array.isArray(children) ? children : [children];

  return (
    <Container className={`hob-grid ${className}`}>
      {columns.map((C, index: number) => {
        const marginOffset = (1.25 * (columns.length - 1)) / columns.length;
        const proportion = 100 / columns.length;
        const Wrapper = styled.div`
          width: calc(
            (${proportion}vw) - (${marginOffset}rem) -
              (${padding * (2 / columns.length)}rem)
          );
          height: calc(
            (${proportion}vw) - (${marginOffset}rem) -
              (${padding * ((columns.length - 1) / columns.length)}rem)
          );
          margin-right: 1.25rem;

          &:last-of-type {
            margin-right: 0;
          }
        `;
        return (
          <Wrapper key={index} className="hob-grid__item">
            {C}
          </Wrapper>
        );
      })}
    </Container>
  );
};
