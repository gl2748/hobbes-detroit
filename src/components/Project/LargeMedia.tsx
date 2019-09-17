import { HobLargeMedia } from "@components/HobLargeMedia";
import { HobTypography } from "@components/HobTypography";
import { HobVideo } from "@components/HobVideo";
import React from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import { IMediaResult, MediaType } from ".";

export const LargeMedia = ({
  mimeType,
  media,
  largeMediaFile,
  caption,
  bleed
}: {
  mimeType: MediaType;
  media: IMediaResult;
  largeMediaFile: string;
  caption: string;
  bleed: boolean;
}) => {
  const Component = (() => {
    switch (mimeType) {
      case MediaType.PNG:
      case MediaType.JPEG:
      case MediaType.JPG:
      case MediaType.GIF: {
        return <img src={largeMediaFile} alt="large media file" />;
      }

      case MediaType.SVG: {
        return <SVG src={largeMediaFile} />;
      }

      case MediaType.LOTTIE: {
        if (media) {
          const { data } = media;
          const defaultOptions = {
            animationData: data,
            autoplay: true,
            loop: true
          };

          return <Lottie options={defaultOptions} />;
        }
        return (
          <HobTypography variant="body1">
            Unable to load lottie file
          </HobTypography>
        );
      }

      case MediaType.MP4:
      case MediaType.QUICKTIME: {
        return (
          <HobVideo>
            <source src={largeMediaFile} type={mimeType} />
          </HobVideo>
        );
      }

      default:
        return <div key={largeMediaFile}>{mimeType}</div>;
    }
  })();

  return (
    <HobLargeMedia bleed={bleed}>
      <div key={largeMediaFile}>
        {Component}
        <HobTypography variant="caption">{caption}</HobTypography>
      </div>
    </HobLargeMedia>
  );
};
