import styled from "@emotion/styled";
import EmblaCarouselReact from "embla-carousel-react";
import React, { HTMLProps, ReactNode, useEffect, useState } from "react";

export interface IGalleryProps {
  children: ReactNode[];
}

export const HobGallery: React.FC<
  IGalleryProps & HTMLProps<HTMLDivElement>
> = ({ children, className = "" }) => {
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    if (embla) {
      embla.on("select", () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`);
      });
    }
  }, [embla]);

  const GallerySlide = styled.div`
    min-width: 66vw;
    margin: 0 0.625rem 0 0.625rem;
  `;

  const gallerySlides = children.map((child, ix) => {
    return <GallerySlide key={`gallery-slide-${ix}`}>{child}</GallerySlide>;
  });

  return (
    <div className={className}>
      <EmblaCarouselReact
        htmlTagName="div"
        emblaRef={setEmbla}
        options={{ loop: false }}
      >
        <div style={{ display: "flex" }}>{gallerySlides}</div>
      </EmblaCarouselReact>
    </div>
  );
};
