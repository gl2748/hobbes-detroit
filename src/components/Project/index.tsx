import { Content, IContentProps } from "@components/Content";
import { HobButton } from "@components/HobButton";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import { ITransformerUploadcareMeta } from "@templates/project-post";
import axios from "axios";
import _ from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import breakpoints from "../../breakpoints";
import { Gallery } from "./Gallery";
import { Header } from "./Header";
import { LargeMedia } from "./LargeMedia";
import { MediaGrid } from "./MediaGrid";
import { ProjectBanner } from "./ProjectBanner";
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
  | { type: "tags"; tags: string[] };

interface IMediaMetaData {
  mediaMetadata?: ITransformerUploadcareMeta[];
}

type ModuleProps = Module & IMediaMetaData;

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

const ModulesContainer = styled.div`
  > * {
    margin-bottom: 1.5rem;
  }
`;

const Tags = styled.ul`
  padding-top: 2.875rem;
  display: flex;
  width: 50%;
  margin: 0 auto;

  ${breakpoints.mobile} {
    width: 100%;
    height: 100%;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  & + .module-text-area {
    padding-top: 1.25rem !important;

    ${breakpoints.mobile} {
      padding-top: 0 !important;
    }
  }

  li {
    border-bottom: 1px solid var(--hob-color--primary);
    padding-bottom: 0.375rem;
    .hob-typography {
      font-size: 0.875rem;
    }
  }

  > * {
    margin-right: 0.5rem;

    &:last-of-type {
      margin-right: none;
    }
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

        default:
          return (
            <HobTypography variant="body">
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
      const { tags } = props;
      return (
        <Tags className="tags">
          {tags.map(tag => (
            <li key={tag}>
              <HobTypography variant="caption">
                {_.kebabCase(tag)}
              </HobTypography>
            </li>
          ))}
        </Tags>
      );

    default:
      return (
        <HobTypography variant="h4">
          Unable to render module type {props.type}
        </HobTypography>
      );
  }
};

export interface IProjectProps {
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
  content,
  contentComponent: PostContent = Content,
  description,
  tags,
  title,
  helmet,
  featured,
  featuredJson,
  protectedProject,
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

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      {helmet || ""}
      <ModulesContainer>
        {withTags(withDefaultHeader(modules, title), tags || []).map(
          (module, index) => (
            <CMSModule
              {...module}
              key={getKey(module)}
              index={index}
              mediaMetadata={mediaMetadata}
            />
          )
        )}
        {content && <PostContent content={content} className="post-content" />}
      </ModulesContainer>

      <BackToTop>
        <HobButton onClick={backToTop} variant="text" color="primary">
          ↑ BACK TO TOP
        </HobButton>
      </BackToTop>
    </Container>
  );
};
