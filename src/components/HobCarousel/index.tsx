import styled from "@emotion/styled";
import React, { ReactNode, useState } from "react";
import breakpoints from "../../breakpoints";
import { HobButton } from "../HobButton";
import { HobTypography } from "../HobTypography";

export interface ICarouselProps {
  children: ReactNode[];
}

const Carousel = styled.div`
  background-color: var(--hob-color--dark);
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.875rem;
  overflow-x: hidden;
  height: 100vh;

  .hob-typography {
    color: var(--hob-color--light);
  }

  .hob-carousel {
    &__nav {
      width: 1.75rem;

      &--left {
        order: -1;
      }

      &--right {
        order: 1;
      }
    }
  }

  ${breakpoints.mobile} {
    .hob-carousel {
      &__nav {
        display: none;
      }
    }
  }
`;

const Page = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  width: 2.8125rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1.25rem;
  margin-top: 1.25rem;

  .hob-typography {
    width: 100%;
  }
`;

const CurrentPage = styled(HobTypography)`
  :after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--hob-color--light);
    display: block;
    margin: 0.625rem 0;
  }
`;

const Horses = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left var(--hob-transition-duration),
    right var(--hob-transition-duration);

  .hob-carousel__horse {
    position: absolute;
    height: 100%;

    &--left {
      left: -100%;
      width: 0;
    }

    &--right {
      right: -100%;
      width: 0;
    }
  }
`;

export const HobCarousel: React.FC<ICarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  const leftIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
  const rightIndex = (currentIndex + 1) % length;
  const changeCurrent = (n: number) => (): void => {
    setCurrentIndex(n === 1 ? rightIndex : leftIndex);
  };

  return (
    <Carousel className="hob-carousel">
      <Page
        className="hob-carousel__page"
        onClick={changeCurrent(1)}
        role="button"
        tabIndex={0}
      >
        <CurrentPage variant="body1">{currentIndex + 1}</CurrentPage>
        <HobTypography variant="body1">{length}</HobTypography>
      </Page>

      <HobButton
        className="hob-carousel__nav hob-carousel__nav--left"
        onClick={changeCurrent(-1)}
        variant="text"
        color="secondary"
      >
        ←
      </HobButton>

      <HobButton
        className="hob-carousel__nav hob-carousel__nav--right"
        onClick={changeCurrent(1)}
        variant="text"
        color="secondary"
      >
        →
      </HobButton>

      <Horses>
        <div className="hob-carousel__horse hob-carousel__horse--left">
          {children[leftIndex]}
        </div>

        <div className="hob-carousel__horse hob-carousel__horse--current">
          {children[currentIndex]}
        </div>

        <div className="hob-carousel__horse hob-carousel__horse--right">
          {children[rightIndex]}
        </div>
      </Horses>
    </Carousel>
  );
};
