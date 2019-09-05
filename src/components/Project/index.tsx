import { Content } from "@components/Content";
import { HobGallery } from "@components/HobGallery";
import { HobGrid } from "@components/HobGrid";
import { HobLogo } from "@components/HobLogo";
import { HobMarkdown } from "@components/HobMarkdown";
import { HobTypography } from "@components/HobTypography";
import styled from "@emotion/styled";
import axios from "axios";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Lottie from "react-lottie";
import breakpoints from "../../breakpoints";

enum MediaType {
  PNG = "image/png",
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
  padding: 1.25rem 6.625rem;

  ${breakpoints.mobile} {
    padding: 1.25rem;
  }

  &.module-media-grid {
    &--one {
      .hob-grid__item {
        width: 50vw;
        height: 50vw;
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
  background-color: var(--hob-color--white);
  height: 100%;
  width: 100%;
  padding: 1rem;

  img,
  svg {
    width: 100%;
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
      padding-bottom: 0;
      margin-bottom: 0;
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
    bottom: -2.25rem;
    left: 0;
  }
`;

const MediaSlideMedia = styled.div`
  .module-gallery-slide {
    max-width: 60vw;
  }
`;

const CMSModule = (props: IModuleProps): ReactElement => {
  const [media, setMedia] = useState<
    Array<{
      data: any;
      type: MediaType;
      url?: string;
    }>
  >([]);

  switch (props.type) {
    case "projectBanner":
      useEffect(() => {
        axios.get(props.projectBannerMedia).then(({ data, headers }) => {
          setMedia([{ data, type: headers["content-type"] }]);
        });
      }, []);
      return (
        <Hero>
          {media.map(({ data, type }, i) => {
            switch (type) {
              case MediaType.PNG:
                return (
                  <img
                    key={`${data}:${i}`}
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
      return (
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

    case "mediaGrid": {
      const makeMediaGridItem = (key: string) => (
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
        switch (type) {
          case MediaType.PNG:
          case MediaType.GIF: {
            return (
              <MediaGridItem key={`${url}:${key}`}>
                <img
                  className="module-media-grid__item"
                  src={url}
                  alt="module media grid item"
                />
              </MediaGridItem>
            );
          }

          case MediaType.SVG: {
            return (
              <MediaGridItem key={`${key}:svg:${i}`}>
                <div dangerouslySetInnerHTML={{ __html: data as string }} />
              </MediaGridItem>
            );
          }

          case MediaType.LOTTIE: {
            const defaultOptions = {
              animationData: data,
              autoplay: true,
              loop: true
            };

            return (
              <MediaGridItem key={`${key}:lottie:${i}`}>
                <Lottie options={defaultOptions} height={400} width={400} />
              </MediaGridItem>
            );
          }

          default:
            return <div key={`${type}:${i}:${key}`}>{type}</div>;
        }
      };

      useEffect(() => {
        Promise.all(
          props.mediaGridMedia.map(({ mediaGridMediaFile }) => {
            return axios.get(mediaGridMediaFile);
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
      }, []);

      return media.length < 4 ? (
        <MediaGrid
          className={`module-media-grid module-media-grid--${
            media.length === 1 ? "one" : "many"
          }`}
        >
          {media.map(makeMediaGridItem("row1"))}
        </MediaGrid>
      ) : (
        <TwoThree>
          <MediaGrid className="module-media-grid">
            {media.slice(0, 2).map(makeMediaGridItem("row1"))}
          </MediaGrid>

          <MediaGrid className="module-media-grid">
            {media.slice(2).map(makeMediaGridItem("row2"))}
          </MediaGrid>
        </TwoThree>
      );
    }
    case "gallery":
      const makeGallerySlide = (slides: IModuleProps["slides"]) => (
        { data, type, url = "" }: { data: any; type: MediaType; url?: string },
        i: number
      ) => {
        switch (type) {
          case MediaType.PNG:
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
                  <div dangerouslySetInnerHTML={{ __html: data }} />
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
      }, []);

      const gallerySlides = media.map(makeGallerySlide(props.slides));

      const GalleryContainer = styled(HobGallery)`
        overflow: visible !important;
        padding: 0 0 8.375rem 0;
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
  content: ReactNode;
  contentComponent: HTMLContent;
  description: string;
  tags: string[];
  title: string;
  helmet: ReactElement;
  featured: boolean;
  protectedProject: boolean;
  modules?: IModuleProps[];
  featuredJson: string;
}

const Container = styled.div`
  padding-bottom: 3rem;

  ${breakpoints.mobile} {
    padding-bottom: 10rem;
  }
`;

export const Project: React.FC<IProjectProps> = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featured,
  featuredJson,
  protectedProject,
  modules = []
}: IProjectProps) => {
  const PostContent = contentComponent || Content;

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

  return (
    <Container>
      {helmet || ""}
      <ModulesContainer>
        {modules.map((module, i) => (
          <CMSModule
            {...module}
            key={
              Object.values(module)
                .filter(Boolean)
                .join(":") + String(i)
            }
          />
        ))}
        {content && <PostContent content={content} />}
        {/* {tags && tags.length ? (
          <div style={{ marginTop: `4rem` }}>
            <h4>Tags</h4>
            <ul>
              {tags.map(tag => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null} */}
      </ModulesContainer>
    </Container>
  );
};
