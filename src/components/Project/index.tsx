import { Content, IContentProps } from "@components/Content";
import { HobGallery } from "@components/HobGallery";
import { HobGrid } from "@components/HobGrid";
import { HobLargeMedia } from "@components/HobLargeMedia";
import { HobLogo } from "@components/HobLogo";
import { HobMarkdown } from "@components/HobMarkdown";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import { ITransformerUploadcareMeta } from "@templates/project-post";
import axios from "axios";
import _ from "lodash";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import Lottie from "react-lottie";
import breakpoints from "../../breakpoints";

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
  LOTTIE = "application/json"
}

export interface IModuleProps {
  textColumns: Array<{ column: string }>;
  bleed: boolean;
  caption: string;
  headerText: string;
  hideCaptions: boolean;
  mediaGridMedia: Array<{ caption: string; mediaGridMediaFile: string }>;
  largeMediaFile: string;
  mobileDeviceMedia: string;
  projectBannerMedia: string;
  tabletDeviceMedia: string;
  type:
    | "gallery"
    | "header"
    | "largeMedia"
    | "mediaGrid"
    | "mobileDevice"
    | "projectBanner"
    | "tabletDevice"
    | "textArea";
  slides: Array<{ caption: string; slideMediaFile: string; type: string }>;
  mediaMetadata: ITransformerUploadcareMeta[];
}

const ModulesContainer = styled.div`
  > * {
    margin-bottom: 1.5rem;
  }
`;

const Hero = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--hob-color--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  img {
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 4rem;

  .hob-logo {
    position: absolute;
    left: 0;
  }

  .hob-typography {
    margin: 0 auto;
    font-size: 2.8125rem;
  }
`;

const TextArea = styled(HobGrid)`
  padding: 1.25rem 6.625rem;

  ${breakpoints.mobile} {
    padding: 1.25rem;
  }

  &.module-text-area {
    &--one {
      padding: 4.125rem 0;
      ${breakpoints.mobile} {
        padding: 0;
      }
      .hob-grid__item {
        width: 50vw;
        height: auto;
        margin: 0 auto;

        ${breakpoints.mobile} {
          width: 100%;
          height: 100%;
          padding: 1.25rem;
        }
      }
    }
  }
`;

const MediaGrid = styled(HobGrid)`
  padding: 1.25rem 6.625rem 0;

  & + & {
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

  img,
  svg {
    width: 100%;
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
  display: flex;

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

const MainTextArea = styled.div`
  .module-text-area,
  .module-text-area--one {
    padding-top: 1.25rem;
    ${breakpoints.mobile} {
      padding-top: 0;
    }
  }
  .main-text-area__tags {
    width: 50vw;
    margin: 0 auto;

    ${breakpoints.mobile} {
      width: 100%;
      height: 100%;
      padding: 0 1.25rem;
    }
  }
`;

const CMSModule = (
  props: IModuleProps & {
    index: number;
    tags?: string[];
    mediaMetadata: ITransformerUploadcareMeta[];
  }
): ReactElement => {
  const [media, setMedia] = useState<
    Array<{
      data: any;
      type: MediaType;
      url?: string;
    }>
  >([]);
  const metaDataGetter = getMetadata(props.mediaMetadata);

  switch (props.type) {
    case "projectBanner":
      const meta = metaDataGetter(props.projectBannerMedia);
      useEffect(() => {
        setMedia([
          {
            data: null,
            type: meta[0].mime_type,
            url: props.projectBannerMedia
          }
        ]);
      }, []);
      return (
        <Hero>
          {media.map(({ data, type }, i) => {
            switch (type) {
              case MediaType.JPG:
              case MediaType.JPEG:
              case MediaType.GIF:
              case MediaType.PNG:
                return (
                  <img
                    key={props.projectBannerMedia}
                    src={props.projectBannerMedia}
                    alt="banner media"
                  />
                );

              default:
                return <div key={`${data}:${i}`}>{type}</div>;
            }
          })}
        </Hero>
      );

    case "header":
      return (
        <Header>
          <HobLogo />
          <HobTypography variant="h2">{props.headerText}</HobTypography>
        </Header>
      );

    case "textArea":
      const { index, tags } = props;
      const text = (
        <TextArea
          className={`module-text-area module-text-area--${
            props.textColumns.length === 1 ? "one" : "many"
          }`}
        >
          {props.textColumns.map(({ column }) => (
            <HobMarkdown source={column} key={column.slice(0, 50)} />
          ))}
        </TextArea>
      );
      return index < 3 && tags && tags.length ? (
        <MainTextArea className="main-text-area">
          <Tags className="main-text-area__tags">
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <HobTypography variant="caption">
                  {_.kebabCase(tag)}
                </HobTypography>
              </li>
            ))}
          </Tags>
          {text}
        </MainTextArea>
      ) : (
        text
      );

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

            return <Lottie options={defaultOptions} height={400} width={400} />;
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
        ).then(multimedia => {
          setMedia(multimedia);
        });
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
            setMedia([{ data, type: headers["content-type"] }]);
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
      const makeGallerySlide = (slides: IModuleProps["slides"]) => (
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
        ).then(multimedia => {
          setMedia(multimedia);
        });
      }, []);

      const gallerySlides = media.map(makeGallerySlide(props.slides));

      const GalleryContainer = styled(HobGallery)`
        overflow: visible !important;
        padding: 1.25rem 0 1.25rem 0;
        margin-bottom: 1.5rem;
      `;

      return <GalleryContainer>{gallerySlides}</GalleryContainer>;

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
  modules?: IModuleProps[];
  featuredJson: string;
  mediaMetadata: ITransformerUploadcareMeta[];
}

const Container = styled.div``;

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

  const getKey = ({ type, ...module }: IModuleProps) => {
    switch (type) {
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
      {helmet || ""}
      <ModulesContainer>
        {modules.map((module, index) => (
          <CMSModule
            {...module}
            key={getKey(module)}
            index={index}
            tags={tags}
            mediaMetadata={mediaMetadata}
          />
        ))}
        {content && <PostContent content={content} className="post-content" />}
      </ModulesContainer>
    </Container>
  );
};
