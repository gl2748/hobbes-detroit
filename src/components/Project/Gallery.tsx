import { HobGallery } from "@components/HobGallery";
import { HobTypography } from "@components/HobTypography";
import { HobVideo } from "@components/HobVideo";
import styled from "@emotion/styled";
import React from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import { IMediaResult, ISlide, MediaType } from ".";

const MediaSlide = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--hob-color--white);
  .hob-logo {
    width: 100px;
    height: 100px;
  }
  > .hob-typography {
    color: var(--hob-color--);
    position: absolute;
    left: 0;
    top: 100%;
  }
  .module-gallery-slide {
    max-width: 60vw;
  }
`;

export const Gallery = React.memo(
  ({ slides, media }: { media: IMediaResult[]; slides: ISlide[] }) => {
    const captions = slides.reduce<{ [key: string]: string }>((acc, slide) => {
      acc[slide.slideMediaFile] = slide.caption;
      return acc;
    }, {});

    const makeGallerySlide = ({
      data,
      type,
      url = ""
    }: {
      data: any;
      type: MediaType;
      url?: string;
    }) => {
      const Component = (() => {
        switch (type) {
          case MediaType.PNG:
          case MediaType.JPEG:
          case MediaType.JPG:
          case MediaType.GIF: {
            return (
              <img
                className="module-gallery-slide"
                src={url}
                alt="module media grid item"
              />
            );
          }

          case MediaType.MP4:
          case MediaType.QUICKTIME: {
            return (
              <HobVideo>
                <source src={url} type={type} />
              </HobVideo>
            );
          }

          case MediaType.SVG: {
            return <SVG src={url} />;
          }

          case MediaType.LOTTIE: {
            const defaultOptions = {
              animationData: data,
              autoplay: true,
              loop: true
            };

            return <Lottie options={defaultOptions} />;
          }

          default:
            return type;
        }
      })();
      return (
        <MediaSlide key={url}>
          {Component}
          <HobTypography variant="caption">{captions[url]}</HobTypography>
        </MediaSlide>
      );
    };

    const GalleryContainer = styled(HobGallery)`
      overflow: visible !important;
      padding: 1.25rem 0;
      margin-bottom: 1.5rem;
    `;

    return <GalleryContainer>{media.map(makeGallerySlide)}</GalleryContainer>;
  },
  (a, b) => {
    return (
      a.media.length === b.media.length &&
      a.slides.every(
        ({ slideMediaFile }, i) => b.slides[i].slideMediaFile === slideMediaFile
      )
    );
  }
);
