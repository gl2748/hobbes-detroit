import styled from "@emotion/styled";
import React, { HTMLProps, ReactElement, ReactNode } from "react";
import breakpoints from "../../breakpoints";

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
          position: relative;
          width: ${100 / columns.length}%;
          border-right: 1.25rem solid transparent;
          border-bottom: 1.25rem solid transparent;

          &:last-of-type {
            border-right: 0;
          }

          ${breakpoints.mobile} {
            width: 100%;
            border-right: none;
            border-bottom: 1.25rem solid transparent;
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
