import { HobGrid } from "@components/HobGrid";
import { HobTypography } from "@components/HobTypography";
import { HobVideo } from "@components/HobVideo";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import breakpoints from "../../breakpoints";
import { IMediaGridMedia, IMediaResult, MediaType } from "./";

const Grid = styled(HobGrid)`
  padding: 1.25rem 1.25rem 0;

  & + &,
  .hob-large-media + & {
    padding-bottom: 1rem;
    padding-top: 0;
    margin-top: -9.75rem;
  }

  + .hob-large-media {
    padding-bottom: 1rem;
    padding-top: 0;
    margin-top: -9.25rem;
  }

  ${breakpoints.mobile} {
    padding: 0 1.25rem;
    & + &,
    .hob-large-media + & {
      padding-bottom: 1rem;
      padding-top: 0;
      margin-top: -3rem;
    }
    + .hob-large-media {
      padding-bottom: 1rem;
      padding-top: 0;
      margin-top: -3rem;
    }
  }

  &.module-media-grid {
    &--one {
      .hob-grid__item {
        width: 50vw;
        margin: 0 auto;

        ${breakpoints.mobile} {
          width: 100%;
          height: 100%;
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }
      }

      img {
        width: 100%;
      }
    }
  }
`;

const MediaGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  ${breakpoints.mobile} {
    > div {
      > svg {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  svg {
    width: auto !important;
    height: auto !important;
    min-height: 100%;
    min-width: 100%;
  }

  > .hob-typography--caption {
    position: absolute;
    left: 0;
    bottom: -1rem;
  }

  .module-media-grid__item {
    img&,
    & img {
      width: 100%;
    }
  }
`;

const TwoThree = styled.div`
  .module-media-grid {
    & + .module-media-grid {
      margin-top: 0rem;
    }
  }

  .hob-grid {
    &:first-of-type {
      margin-bottom: 0;
    }
    &:last-of-type {
      padding-top: 0;
    }
    ${breakpoints.mobile} {
      &:nth-of-type(1) {
        padding-bottom: 0;
      }
      &:nth-of-type(2) {
        padding-top: 0;
      }
    }
  }
`;

export const MediaGrid = React.memo(
  ({
    media,
    mediaGridMedia,
    hideCaptions
  }: {
    media: IMediaResult[];
    mediaGridMedia: IMediaGridMedia[];
    hideCaptions: boolean;
  }): ReactElement => {
    const makeMediaGridItem = (
      {
        data,
        type,
        url = ""
      }: {
        data: any;
        type: MediaType;
        url?: string;
      },
      i: number
    ) => {
      const Component = (() => {
        switch (type) {
          case MediaType.PNG:
          case MediaType.JPEG:
          case MediaType.JPG:
          case MediaType.GIF:
            return (
              <img
                className="module-media-grid__item"
                src={url}
                alt="module media grid item"
              />
            );

          case MediaType.SVG:
            return <SVG className="module-media-grid__item" src={url} />;

          case MediaType.LOTTIE: {
            const defaultOptions = {
              animationData: data,
              autoplay: true,
              loop: true
            };

            return (
              <Lottie isClickToPauseDisabled={true} options={defaultOptions} />
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

          default:
            return <div key={mediaGridMedia[i].mediaGridMediaFile}>{type}</div>;
        }
      })();

      return (
        <MediaGridItem key={mediaGridMedia[i].mediaGridMediaFile}>
          {Component}
          {!hideCaptions && (
            <HobTypography variant="caption">
              {mediaGridMedia[i].caption}
            </HobTypography>
          )}
        </MediaGridItem>
      );
    };

    return media.length < 4 ? (
      <Grid
        className={`module-media-grid module-media-grid--${
          media.length === 1 ? "one" : "many"
        }`}
      >
        {media.map(makeMediaGridItem)}
      </Grid>
    ) : (
      <TwoThree>
        <Grid className="module-media-grid">
          {media.slice(0, 2).map(makeMediaGridItem)}
        </Grid>

        <Grid className="module-media-grid">
          {media.slice(2).map(makeMediaGridItem)}
        </Grid>
      </TwoThree>
    );
  },
  (a, b) => {
    return (
      a.media.length === b.media.length &&
      a.mediaGridMedia.every(
        ({ mediaGridMediaFile }, i) =>
          b.mediaGridMedia[i].mediaGridMediaFile === mediaGridMediaFile
      )
    );
  }
);
