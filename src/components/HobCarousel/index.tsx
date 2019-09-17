import styled from "@emotion/styled";
import EmblaCarousel from "embla-carousel";
import EmblaCarouselReact from "embla-carousel-react";
import React, { ReactNode, useEffect, useState } from "react";
import breakpoints from "../../breakpoints";
import { HobButton } from "../HobButton";
import { HobTypography } from "../HobTypography";

export interface ICarouselProps {
  children: ReactNode[];
}

const Container = styled.div`
  background-color: var(--hob-color--dark);
  position: relative;
  padding: 1.25rem;
  height: 100vh;

  .hob-typography {
    color: var(--hob-color--light);
  }

  .hob-carousel {
    &__nav {
      z-index: 1;
      width: 1.75rem;
      position: absolute;
      top: calc(50% - 2.5rem);

      &--left {
        left: 1.25rem;
      }

      &--right {
        right: 1.25rem;
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

const Carousel = styled(EmblaCarouselReact)`
  height: 100%;
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
  display: flex;
  height: 100%;

  > * {
    flex: 0 0 100%;
  }
`;

export const HobCarousel: React.FC<ICarouselProps> = ({ children }) => {
  const [embla, setEmbla] = useState<null | EmblaCarousel>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        setCurrentIndex(embla.selectedScrollSnap());
      });
    }
  }, [embla]);

  const prevClick = () => {
    if (embla) {
      embla.scrollPrev();
    }
  };

  const nextClick = () => {
    if (embla) {
      embla.scrollNext();
    }
  };

  return (
    <Container className="hob-carousel">
      <Page
        className="hob-carousel__page"
        onClick={nextClick}
        role="button"
        tabIndex={0}
      >
        <CurrentPage variant="body1">{currentIndex + 1}</CurrentPage>
        <HobTypography variant="body1">{length}</HobTypography>
      </Page>

      <HobButton
        className="hob-carousel__nav hob-carousel__nav--left"
        onClick={prevClick}
        variant="text"
        color="secondary"
      >
        ←
      </HobButton>

      <HobButton
        className="hob-carousel__nav hob-carousel__nav--right"
        onClick={nextClick}
        variant="text"
        color="secondary"
      >
        →
      </HobButton>

      <Carousel htmlTagName="div" emblaRef={setEmbla} options={{ loop: true }}>
        <Horses>{children}</Horses>
      </Carousel>
    </Container>
  );
};
