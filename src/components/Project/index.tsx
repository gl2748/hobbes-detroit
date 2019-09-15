import { Content, IContentProps } from "@components/Content";
import { HobButton } from "@components/HobButton";
import { HobGallery } from "@components/HobGallery";
import { HobGrid } from "@components/HobGrid";
import { HobLargeMedia } from "@components/HobLargeMedia";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import { ITransformerUploadcareMeta } from "@templates/project-post";
import axios from "axios";
import _ from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import breakpoints from "../../breakpoints";
import { Header } from "./Header";
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

interface Slide {
  caption: string;
  slideMediaFile: string;
  type: string;
}

export type Module =
  | {
      type: "textArea";
      textColumns: Array<{ column: string }>;
    }
  | {
      type: "gallery";
      slides: Slide[];
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
      mediaGridMedia: Array<{ caption: string; mediaGridMediaFile: string }>;
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

const MediaGrid = styled(HobGrid)`
  padding: 1.25rem 1.25rem 0;

  & + &,
  .hob-large-media + & {
    padding-bottom: 1rem;
    padding-top: 0;
    margin-bottom: 0;
    margin-top: -1.5rem;
  }

  ${breakpoints.mobile} {
    padding: 0 1.25rem;
  }

  &.module-media-grid {
    &--one {
      .hob-grid__item {
        width: 50vw;
        margin: 0 auto;

        ${breakpoints.mobile} {
          width: 100%;
          height: 100%;
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

  > div {
    width: 100% !important;
    height: 100% !important;
  }

  img,
  svg {
    width: 100%;
    height: 100%;
  }

  .hob-typography {
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
  .hob-typography {
    color: var(--hob-color--);
    font-size: 1.75rem;
    position: absolute;
    left: 0;
    top: 100%;
  }
`;

const MediaSlideMedia = styled.div`
  .module-gallery-slide {
    max-width: 60vw;
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
  const [media, setMedia] = useState<
    Array<{
      data: any;
      type: MediaType;
      url?: string;
    }>
  >([]);

  const metaDataGetter = getMetadata(props.mediaMetadata || []);

  switch (props.type) {
    case "projectBanner":
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
            <HobTypography variant="caption">
              Cannot render project banner
            </HobTypography>
          );
      }

    case "header":
      return <Header text={props.headerText} />;

    case "textArea":
      return <TextArea text={props.textColumns.map(({ column }) => column)} />;

    case "mediaGrid": {
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
        const components = {
          [MediaType.PNG]: () => (
            <img
              className="module-media-grid__item"
              src={url}
              alt="module media grid item"
            />
          ),
          [MediaType.JPG]: () => (
            <img
              className="module-media-grid__item"
              src={url}
              alt="module media grid item"
            />
          ),
          [MediaType.JPEG]: () => (
            <img
              className="module-media-grid__item"
              src={url}
              alt="module media grid item"
            />
          ),
          [MediaType.GIF]: () => (
            <img
              className="module-media-grid__item"
              src={url}
              alt="module media grid item"
            />
          ),
          [MediaType.SVG]: () => (
            <SVG className="module-media-grid__item" src={url} />
          ),
          [MediaType.LOTTIE]: () => {
            const defaultOptions = {
              animationData: data,
              autoplay: true,
              loop: true
            };

            return <Lottie options={defaultOptions} />;
          }
        };
        const Component =
          components[type] ||
          (() => (
            <div key={props.mediaGridMedia[i].mediaGridMediaFile}>{type}</div>
          ));

        return (
          <MediaGridItem key={props.mediaGridMedia[i].mediaGridMediaFile}>
            <Component />
            {!props.hideCaptions && (
              <HobTypography variant="caption">
                {props.mediaGridMedia[i].caption}
              </HobTypography>
            )}
          </MediaGridItem>
        );
      };

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

      return media.length < 4 ? (
        <MediaGrid
          className={`module-media-grid module-media-grid--${
            media.length === 1 ? "one" : "many"
          }`}
        >
          {media.map(makeMediaGridItem)}
        </MediaGrid>
      ) : (
        <TwoThree>
          <MediaGrid className="module-media-grid">
            {media.slice(0, 2).map(makeMediaGridItem)}
          </MediaGrid>

          <MediaGrid className="module-media-grid">
            {media.slice(2).map(makeMediaGridItem)}
          </MediaGrid>
        </TwoThree>
      );
    }

    case "largeMedia":
      useEffect(() => {
        const largeMediaMetadata = metaDataGetter(props.largeMediaFile);
        if (largeMediaMetadata[0].mime_type === MediaType.LOTTIE) {
          axios.get(props.largeMediaFile).then(({ data, headers }) => {
            setMedia([{ data, type: MediaType.LOTTIE }]);
          });
        } else {
          setMedia([
            {
              data: null,
              type: largeMediaMetadata[0].mime_type,
              url: props.largeMediaFile
            }
          ]);
        }
      }, []);
      return (
        <HobLargeMedia bleed={props.bleed}>
          {media.map(({ data, type }, i) => {
            switch (type) {
              case MediaType.PNG:
              case MediaType.JPEG:
              case MediaType.JPG:
              case MediaType.GIF: {
                return (
                  <div key={props.largeMediaFile}>
                    <img src={props.largeMediaFile} alt="banner media" />
                    <HobTypography variant="body1">
                      {props.caption}
                    </HobTypography>
                  </div>
                );
              }
              case MediaType.SVG: {
                return (
                  <div key={props.largeMediaFile}>
                    <SVG src={props.largeMediaFile} />
                    <HobTypography variant="body1">
                      {props.caption}
                    </HobTypography>
                  </div>
                );
              }

              case MediaType.LOTTIE: {
                const defaultOptions = {
                  animationData: data,
                  autoplay: true,
                  loop: true
                };

                return (
                  <div key={props.largeMediaFile}>
                    <Lottie options={defaultOptions} height={400} width={400} />
                    <HobTypography variant="body1">
                      {props.caption}
                    </HobTypography>
                  </div>
                );
              }
              default:
                return <div key={props.largeMediaFile}>{type}</div>;
            }
          })}
        </HobLargeMedia>
      );
    case "gallery":
      const makeGallerySlide = (slides: ModuleProps["slides"]) => (
        { data, type, url = "" }: { data: any; type: MediaType; url?: string },
        i: number
      ) => {
        switch (type) {
          case MediaType.PNG:
          case MediaType.JPEG:
          case MediaType.JPG:
          case MediaType.GIF: {
            return (
              <MediaSlide key={`${url}`}>
                <MediaSlideMedia>
                  <img
                    className="module-gallery-slide"
                    src={url}
                    alt="module media grid item"
                  />
                </MediaSlideMedia>
                <HobTypography variant="body1">
                  {
                    slides.filter(slide => slide.slideMediaFile === url)[0]
                      .caption
                  }
                </HobTypography>
              </MediaSlide>
            );
          }

          case MediaType.SVG: {
            return (
              <MediaSlide key={`svg:${i}`}>
                <MediaSlideMedia>
                  <SVG src={url} />
                </MediaSlideMedia>
                <HobTypography variant="body1">
                  {
                    slides.filter(slide => slide.slideMediaFile === url)[0]
                      .caption
                  }
                </HobTypography>
              </MediaSlide>
            );
          }

          case MediaType.LOTTIE: {
            const defaultOptions = {
              animationData: data,
              autoplay: true,
              loop: true
            };

            return (
              <MediaSlide key={`lottie:${i}`}>
                <MediaSlideMedia>
                  <Lottie options={defaultOptions} height={400} width={400} />
                </MediaSlideMedia>
                <HobTypography variant="body1">
                  {
                    slides.filter(slide => slide.slideMediaFile === url)[0]
                      .caption
                  }
                </HobTypography>
              </MediaSlide>
            );
          }

          default:
            return <div key={`${type}:${i}`}>{type}</div>;
        }
      };

      useEffect(() => {
        Promise.all(
          props.slides.map(({ slideMediaFile }) => {
            return axios.get(slideMediaFile);
          })
        ).then(responses => {
          setMedia(
            responses.map(({ data, headers, request }) => ({
              data,
              type: headers["content-type"],
              url: request.responseURL
            }))
          );
        });

        Promise.all(
          props.slides.map(async ({ slideMediaFile }) => {
            const slideMeta = metaDataGetter(slideMediaFile);
            if (slideMeta[0].mime_type === MediaType.LOTTIE) {
              const response = await axios.get(slideMediaFile);
              return {
                data: response.data,
                type: mediaGridMeta[0].mime_type,
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

      const gallerySlides = media.map(makeGallerySlide(props.slides));

      const GalleryContainer = styled(HobGallery)`
        overflow: visible !important;
        padding: 1.25rem 0 1.25rem 0;
        margin-bottom: 1.5rem;
      `;

      return <GalleryContainer>{gallerySlides}</GalleryContainer>;

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
