import { HobTypography } from "@components/HobTypography";
import { HobVideo } from "@components/HobVideo";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import Lottie, { Options } from "react-lottie";
import { MediaImage, MediaType, MediaVideo } from ".";
import breakpoints from "../../breakpoints";

const Banner = styled.div<{
  image?: string;
  heightWidthRatio?: number;
  widthHeightRatio?: number;
}>`
  height: calc(100vh - 5.25rem);
  width: 100vw;
  ${breakpoints.mobile} {
    width: 100vw;
    height: ${props =>
      props.heightWidthRatio ? props.heightWidthRatio * 100 + "vw" : "56.25vw"};
    max-height: 100vh;
    max-width: ${props =>
      props.widthHeightRatio
        ? props.widthHeightRatio * 100 + "vh"
        : "177.78vh"};
    margin-bottom: 3rem;
    padding: 0.75rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  margin-bottom: 0;

  :after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    ${breakpoints.mobile} {
      background-size: auto 100%;
    }
  }

  &.media-project-banner--lottie {
    > div {
      background-color: #ffffff;
    }
    :after {
      display: none;
    }
  }
`;

type Props =
  | {
      mimeType: MediaImage;
      imageUrl: string;
      width: number;
      height: number;
    }
  | {
      mimeType: MediaType.LOTTIE;
      animationOptions: Options;
      width: number;
      height: number;
    }
  | {
      mimeType: MediaVideo;
      videoUrl: string;
      videoThumbnail?: string;
      width: number;
      height: number;
    };

export const ProjectBanner = (props: Props): ReactElement => {
  const bannerHeightWidthRatio = props.height / props.width;
  const bannerWidthHeightRatio = props.width / props.height;
  switch (props.mimeType) {
    case MediaType.PNG:
    case MediaType.JPEG:
    case MediaType.JPG:
    case MediaType.GIF:
      return (
        <Banner
          className="media-project-banner"
          image={props.imageUrl}
          heightWidthRatio={bannerHeightWidthRatio}
          widthHeightRatio={bannerWidthHeightRatio}
        />
      );

    case MediaType.LOTTIE:
      return (
        <Banner
          className="media-project-banner media-project-banner--lottie"
          heightWidthRatio={bannerHeightWidthRatio}
          widthHeightRatio={bannerWidthHeightRatio}
        >
          {Object.keys(props.animationOptions.animationData).length && (
            <Lottie
              options={props.animationOptions}
              isPaused={false}
              isStopped={false}
            />
          )}
        </Banner>
      );

    case MediaType.MP4:
    case MediaType.QUICKTIME: {
      return (
        <HobVideo poster={props.videoThumbnail}>
          <source src={props.videoUrl} type={props.mimeType} />
        </HobVideo>
      );
    }
  }
};
