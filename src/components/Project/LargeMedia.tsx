import { HobLargeMedia } from "@components/HobLargeMedia";
import { HobTypography } from "@components/HobTypography";
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
        const { data } = media;
        const defaultOptions = {
          animationData: data,
          autoplay: true,
          loop: true
        };

        return <Lottie options={defaultOptions} height={400} width={400} />;
      }

      case MediaType.MP4:
      case MediaType.QUICKTIME: {
        return (
          <video controls={true} width="320" height="240">
            <source src={largeMediaFile} type={mimeType} />
          </video>
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
