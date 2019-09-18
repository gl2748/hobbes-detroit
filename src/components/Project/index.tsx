import { Content, IContentProps } from "@components/Content";
import { HobButton } from "@components/HobButton";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import { ITransformerUploadcareMeta } from "@templates/project-post";
import axios from "axios";
import _ from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import { Gallery } from "./Gallery";
import { Header } from "./Header";
import { LargeMedia } from "./LargeMedia";
import { MediaGrid } from "./MediaGrid";
import { ProjectBanner } from "./ProjectBanner";
import { ProjectTags } from "./ProjectTags";
import { Team } from "./Team";
import { TextArea } from "./TextArea";

const getUploadcareUUID = (url: string): string => {
  return url.split("https://ucarecdn.com/")[1].split("/")[0];
};

const getMediaMetadata = (haystack: ITransformerUploadcareMeta[]) => (
  needle: string
) => {
  return haystack.filter(bushel => {
    return bushel.uuid === needle;
  });
};

const getMetadata = (allMetadata: ITransformerUploadcareMeta[]) => {
  return _.flowRight(
    getMediaMetadata(allMetadata),
    getUploadcareUUID
  );
};

export enum MediaType {
  PNG = "image/png",
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  SVG = "image/svg+xml",
  GIF = "image/gif",
  LOTTIE = "application/json",
  MP4 = "video/mp4",
  QUICKTIME = "video/quicktime"
}

export type MediaVideo = MediaType.QUICKTIME | MediaType.MP4;

export type MediaImage =
  | MediaType.GIF
  | MediaType.JPEG
  | MediaType.JPG
  | MediaType.PNG;

export interface ISlide {
  caption: string;
  slideMediaFile: string;
  type: string;
}

export interface IMediaGridMedia {
  caption: string;
  mediaGridMediaFile: string;
}
export interface IMediaResult {
  data: any;
  type: MediaType;
  url?: string;
}

export type Module =
  | {
      type: "textArea";
      textColumns: Array<{ column: string }>;
    }
  | {
      type: "gallery";
      slides: ISlide[];
    }
  | {
      type: "header";
      headerText: string;
    }
  | {
      type: "largeMedia";
      largeMediaFile: string;
      bleed: boolean;
      caption: string;
    }
  | {
      type: "mediaGrid";
      mediaGridMedia: IMediaGridMedia[];
      hideCaptions: boolean;
    }
  | { type: "projectBanner"; projectBannerMedia: string }
  | { type: "mobileDevice"; mobileDeviceMedia: string }
  | { type: "tabletDevice"; tabletDeviceMedia: string }
  | { type: "tags"; tags: string[] }
  | { type: "team"; team: string[]; press: string[] };

interface IMediaMetaData {
  mediaMetadata?: ITransformerUploadcareMeta[];
}

export type ModuleProps = Module & IMediaMetaData;

const withDefaultHeader = (ms: ModuleProps[], title: string): ModuleProps[] => {
  if (ms.findIndex(mod => mod.type === "header") === -1) {
    const header: Module = {
      headerText: title,
      type: "header"
    };
    return [ms[0], header, ...ms.slice(1)];
  }
  return ms;
};

const withTags = (ms: ModuleProps[], tags: string[]): ModuleProps[] => {
  const tagsElement: ModuleProps = { tags, type: "tags" };
  return tags && tags.length
    ? [...ms.slice(0, 2), tagsElement, ...ms.slice(2)]
    : ms;
};

const withTeamAndPress = (
  ms: ModuleProps[],
  team: string[],
  press: string[]
): ModuleProps[] => {
  const teamElement: ModuleProps = { team, press, type: "team" };
  return team.length || press.length ? [...ms, teamElement] : ms;
};

const ModulesContainer = styled.div`
  > * {
    margin-bottom: 3rem;
  }
`;

const CMSModule = (props: ModuleProps & { index: number }): ReactElement => {
  const [media, setMedia] = useState<IMediaResult[]>([]);

  const metaDataGetter = getMetadata(props.mediaMetadata || []);

  switch (props.type) {
    case "projectBanner": {
      const meta = metaDataGetter(props.projectBannerMedia);
      const mimeType = meta[0] && meta[0].mime_type;
      switch (mimeType) {
        case MediaType.PNG:
        case MediaType.JPEG:
        case MediaType.JPG:
        case MediaType.GIF:
          return (
            <ProjectBanner
              mimeType={mimeType}
              imageUrl={props.projectBannerMedia}
            />
          );

        case MediaType.LOTTIE:
          useEffect(() => {
            axios.get(props.projectBannerMedia).then(({ data }) => {
              setMedia([{ data, type: MediaType.LOTTIE }]);
            });
          }, []);

          return (
            <ProjectBanner
              mimeType={mimeType}
              animationOptions={{
                animationData: media[0] ? media[0].data : {},
                autoplay: true,
                loop: true
              }}
            />
          );

        case MediaType.MP4:
        case MediaType.QUICKTIME:
          return (
            <ProjectBanner
              mimeType={mimeType}
              videoUrl={props.projectBannerMedia}
            />
          );

        default:
          return (
            <HobTypography variant="body1">
              Cannot render project banner
            </HobTypography>
          );
      }
    }

    case "header":
      return <Header text={props.headerText} />;

    case "textArea":
      return <TextArea text={props.textColumns.map(({ column }) => column)} />;

    case "mediaGrid": {
      useEffect(() => {
        Promise.all(
          props.mediaGridMedia.map(async ({ mediaGridMediaFile }) => {
            const mediaGridMeta = metaDataGetter(mediaGridMediaFile);
            if (mediaGridMeta[0].mime_type === MediaType.LOTTIE) {
              const response = await axios.get(mediaGridMediaFile);
              return {
                data: response.data,
                type: mediaGridMeta[0].mime_type,
                url: mediaGridMediaFile
              };
            } else {
              return {
                data: null,
                type: mediaGridMeta[0].mime_type,
                url: mediaGridMediaFile
              };
            }
          })
        ).then(setMedia);
      }, []);

      return (
        <MediaGrid
          media={media}
          mediaGridMedia={props.mediaGridMedia}
          hideCaptions={props.hideCaptions}
        />
      );
    }

    case "largeMedia": {
      const largeMediaMetadata = metaDataGetter(props.largeMediaFile);
      const mimeType = largeMediaMetadata[0].mime_type;
      useEffect(() => {
        if (mimeType === MediaType.LOTTIE) {
          axios.get(props.largeMediaFile).then(({ data, headers }) => {
            setMedia([{ data, type: MediaType.LOTTIE }]);
          });
        }
      }, []);

      return (
        <LargeMedia
          mimeType={mimeType}
          media={media[0]}
          bleed={props.bleed}
          largeMediaFile={props.largeMediaFile}
          caption={props.caption}
        />
      );
    }

    case "gallery": {
      useEffect(() => {
        Promise.all(
          props.slides.map(async ({ slideMediaFile }) => {
            const slideMeta = metaDataGetter(slideMediaFile);
            if (slideMeta[0].mime_type === MediaType.LOTTIE) {
              const response = await axios.get(slideMediaFile);
              return {
                data: response.data,
                type: slideMeta[0].mime_type,
                url: slideMediaFile
              };
            } else {
              return {
                data: null,
                type: slideMeta[0].mime_type,
                url: slideMediaFile
              };
            }
          })
        ).then(setMedia);
      }, []);

      return <Gallery media={media} slides={props.slides} />;
    }

    case "tags":
      return <ProjectTags tags={props.tags} />;

    case "team":
      return <Team team={props.team} press={props.press} />;

    default:
      return (
        <HobTypography variant="h4">
          Unable to render module type {props.type}
        </HobTypography>
      );
  }
};

export interface IProjectProps {
  backToTop: () => void;
  content: string;
  contentComponent?: React.FC<IContentProps>;
  description: string;
  tags?: string[];
  title: string;
  helmet: ReactElement;
  featured: boolean;
  protectedProject: boolean;
  modules?: ModuleProps[];
  featuredJson: string;
  mediaMetadata: ITransformerUploadcareMeta[];
  team: string[];
  press: string[];
  metaImage: string;
}

const Container = styled.div``;
const BackToTop = styled.div`
  width: 100vw;
  margin: 7.375rem 0;

  .hob-button {
    margin: 0 auto;
  }

  .hob-typography--button {
    font-size: 1.125rem;
  }
`;

export const Project: React.FC<IProjectProps> = ({
  backToTop,
  content,
  contentComponent: PostContent = Content,
  description,
  tags,
  title,
  helmet,
  featured,
  featuredJson,
  protectedProject,
  team,
  press,
  modules = [],
  mediaMetadata
}: IProjectProps) => {
  const [animationData, setAnimationData] = useState<{
    [key: string]: any;
  } | null>(null);

  useEffect(() => {
    axios.get(featuredJson).then(({ data }) => {
      setAnimationData(data);
    });
  }, []);

  const defaultOptions = {
    animationData,
    autoplay: true,
    loop: true
  };

  const getKey = (module: ModuleProps) => {
    switch (module.type) {
      case "header":
        return module.headerText;

      case "gallery":
        return module.slides.map(tc => tc.slideMediaFile).join(":");

      case "textArea":
        return module.textColumns.map(tc => tc.column.slice(0, 20)).join(":");

      case "projectBanner":
        return module.projectBannerMedia;

      case "largeMedia":
        return module.largeMediaFile;

      case "mediaGrid":
        return module.mediaGridMedia.map(m => m.mediaGridMediaFile).join(":");

      default:
        return Object.values(module)
          .filter(Boolean)
          .join(":");
    }
  };

  return (
    <Container>
      {helmet}
      {modules && (
        <ModulesContainer>
          {withTeamAndPress(
            withTags(withDefaultHeader(modules, title), tags || []),
            team || [],
            press || []
          ).map((module, index) => (
            <CMSModule
              {...module}
              key={getKey(module)}
              index={index}
              mediaMetadata={mediaMetadata}
            />
          ))}
          {content && (
            <PostContent content={content} className="post-content" />
          )}
        </ModulesContainer>
      )}

      <BackToTop>
        <HobButton onClick={backToTop} variant="text" color="primary">
          ↑ BACK TO TOP
        </HobButton>
      </BackToTop>
    </Container>
  );
};
