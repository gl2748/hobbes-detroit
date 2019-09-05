import styled from "@emotion/styled";
import React, { HTMLProps, ReactElement, ReactNode } from "react";

export interface IGridProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const HobGrid = ({
  children,
  className = ""
}: IGridProps & HTMLProps<HTMLDivElement>): ReactElement => {
  const columns: ReactNode[] = Array.isArray(children) ? children : [children];

  return (
    <Container className={`hob-grid ${className}`}>
      {columns.map((C, index: number) => {
        const Wrapper = styled.div`
          width: ${100 / columns.length}%;
          border-right: 1.25rem solid transparent;

          &:last-of-type {
            border-right: 0;
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
