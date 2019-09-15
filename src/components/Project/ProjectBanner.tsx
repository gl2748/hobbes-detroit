import { HobTypography } from "@components/HobTypography";
import { HobVideo } from "@components/HobVideo";
import styled from "@emotion/styled";
import React, { ReactElement } from "react";
import Lottie, { Options } from "react-lottie";
import { MediaImage, MediaType, MediaVideo } from ".";
import breakpoints from "../../breakpoints";

const Banner = styled.div<{ image?: string }>`
  height: calc(100vh - 5.25rem);
  ${breakpoints.mobile} {
    height: calc(100vh - 3.5rem);
  }
  width: 100vw;
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
    :after {
      display: none;
    }
  }
`;

type Props =
  | {
      mimeType: MediaImage;
      imageUrl: string;
    }
  | {
      mimeType: MediaType.LOTTIE;
      animationOptions: Options;
    }
  | {
      mimeType: MediaVideo;
      videoUrl: string;
    };

export const ProjectBanner = (props: Props): ReactElement => {
  switch (props.mimeType) {
    case MediaType.PNG:
    case MediaType.JPEG:
    case MediaType.JPG:
    case MediaType.GIF:
      return <Banner className="media-project-banner" image={props.imageUrl} />;

    case MediaType.LOTTIE:
      return (
        <Banner className="media-project-banner media-project-banner--lottie">
          {Object.keys(props.animationOptions.animationData).length && (
            <Lottie options={props.animationOptions} />
          )}
        </Banner>
      );

    case MediaType.MP4:
    case MediaType.QUICKTIME: {
      return (
        <HobVideo>
          <source src={props.videoUrl} type={props.mimeType} />
        </HobVideo>
      );
    }
  }
};
