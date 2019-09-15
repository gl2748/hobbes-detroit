import styled from "@emotion/styled";
import EmblaCarousel from "embla-carousel";
import EmblaCarouselReact from "embla-carousel-react";
import React, { HTMLProps, ReactNode, useState } from "react";
import breakpoints from "../../breakpoints";

export interface IGalleryProps {
  children: ReactNode[];
}

const Container = styled(EmblaCarouselReact)`
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
      font-size: 4rem;
      background: none;
      border: none;
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
    }
  }
`;

export const HobGallery: React.FC<
  IGalleryProps & HTMLProps<HTMLDivElement>
> = ({ children, className = "" }) => {
  const [embla, setEmbla] = useState<null | EmblaCarousel>(null);

  const GallerySlide = styled.div`
    min-width: 66vw;
    margin: 0 0.625rem 0 0.625rem;
  `;

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
    <Container
      htmlTagName="div"
      emblaRef={setEmbla}
      options={{ loop: true }}
      className={`hob-gallery ${className}`}
    >
      <div style={{ display: "flex" }}>{gallerySlides}</div>

      <button
        type="button"
        onClick={prevClick}
        className="hob-gallery__button hob-gallery__button--prev"
      >
        &lt;
      </button>

      <button
        className="hob-gallery__button hob-gallery__button--next"
        type="button"
        onClick={nextClick}
      >
        &gt;
      </button>
    </Container>
  );
};
