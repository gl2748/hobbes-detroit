import styled from "@emotion/styled";
import EmblaCarousel from "embla-carousel";
import EmblaCarouselReact from "embla-carousel-react";
import React, { HTMLProps, ReactNode, useEffect, useState } from "react";
import breakpoints from "../../breakpoints";

export interface IGalleryProps {
  children: ReactNode[];
}

const Container = styled.div`
  position: relative;

  &:hover {
    cursor: grab;
  }

  .hob-gallery {
    &__button {
      ${breakpoints.mobile} {
        display: none;
      }
      position: absolute;
      /**margin and padding of wrapper */
      top: calc(50% - 4rem);
      font-size: 1.75rem;
      background: none;
      border: none;
      transition: opacity var(--hob-transition-duration);
      &:hover,
      &:focus {
        cursor: pointer;
      }

      &--next {
        right: 1.25rem;
      }

      &--prev {
        left: 1.25rem;
      }

      &--disabled {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
`;
const Carousel = styled(EmblaCarouselReact)``;

const StyledSlide = styled.div`
  min-width: 66vw;
  margin: 0 0.625rem 0 0.625rem;
`;

const GallerySlide = React.memo((props: HTMLProps<HTMLDivElement>) => (
  <StyledSlide {...props} />
));

export const HobGallery: React.FC<
  IGalleryProps & HTMLProps<HTMLDivElement>
> = ({ children, className = "" }) => {
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

  const gallerySlides = children.map((child, ix) => {
    return (
      <GallerySlide className="hob-gallery__slide" key={`gallery-slide-${ix}`}>
        {child}
      </GallerySlide>
    );
  });

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
    <Container className={`hob-gallery ${className}`}>
      <Carousel htmlTagName="div" emblaRef={setEmbla} options={{ loop: false }}>
        <div style={{ display: "flex" }}>{gallerySlides}</div>
      </Carousel>

      <button
        type="button"
        onClick={prevClick}
        className={`hob-gallery__button hob-gallery__button--prev hob-gallery__button--${
          currentIndex === 0 ? "disabled" : "enabled"
        }`}
      >
        ←
      </button>

      <button
        className={`hob-gallery__button hob-gallery__button--next hob-gallery__button--${
          currentIndex === length - 1 ? "disabled" : "enabled"
        }`}
        type="button"
        onClick={nextClick}
      >
        →
      </button>
    </Container>
  );
};
