import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { HobCarousel } from "../HobCarousel";

export interface ICarouselProps {
  children: ReactNode[];
}

const Carousel = styled.div`
  background-color: var(--hob-color--dark);
  position: relative;
`;

export const HeroCarousel: React.FC<ICarouselProps> = ({ children }) => {
  return (
    <Carousel>
      <HobCarousel>{children}</HobCarousel>
    </Carousel>
  );
};
