import styled from "@emotion/styled";
import axios from "axios";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Content, HTMLContent } from "../Content";
import { HobGrid } from "../HobGrid";
import { HobLogo } from "../HobLogo";
import { HobTypography } from "../HobTypography";

enum MediaType {
  PNG = "image/png",
  SVG = "image/svg+xml"
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
    | "mediaGrid"
    | "mobileDevice"
    | "projectBanner"
    | "tabletDevice"
    | "textArea"
    | "textArea"
    | "textArea";

  slides: Array<{ caption: string; slideMediaFile: string; type: string }>;
}

const ModulesContainer = styled.div`
  > * {
    margin-bottom: 1.5rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Hero = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--hob-color--white);
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

  .hob-typography {
    font-size: 1.75rem;
  }

  &.module-text-area {
    &--one {
      padding: 4.125rem 0;
      .hob-typography {
        width: 50%;
        margin: 0 auto;
      }
    }
  }
`;

const CMSModule = (props: IModuleProps): ReactElement => {
  const [media, setMedia] = useState<Array<{
    data: any;
    type: MediaType;
  }> | null>(null);

  switch (props.type) {
    case "projectBanner":
      useEffect(() => {
        axios.get(props.projectBannerMedia).then(({ data, headers }) => {
          setMedia([{ data, type: headers["content-type"] }]);
        });
      }, []);
      return (
        <Hero>
          {media &&
            media.map(({ data, type }, i) => {
              switch (type) {
                case MediaType.PNG:
                  return (
                    <img
                      key={`${data}:${i}`}
                      src={props.projectBannerMedia}
                      alt="banner media"
                    />
                  );
                  break;

                default:
                  return <div key={`${data}:${i}`}>{data}</div>;
                  break;
              }
            })}
        </Hero>
      );
      break;

    case "header":
      return (
        <Header>
          <HobLogo />
          <HobTypography variant="h2">{props.headerText}</HobTypography>
        </Header>
      );
      break;

    case "textArea":
      return (
        <TextArea
          className={`module-text-area module-text-area--${
            props.textColumns.length === 1 ? "one" : "many"
          }`}
        >
          {props.textColumns.map(({ column }) => (
            <HobTypography variant="body1" key={column.slice(0, 50)}>
              {column}
            </HobTypography>
          ))}
        </TextArea>
      );
      break;

    default:
      return (
        <HobTypography variant="h4">
          Unable to render module type {props.type}
        </HobTypography>
      );
      break;
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

const Container = styled.div``;

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
        <PostContent content={content} />
        {tags && tags.length ? (
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
        ) : null}
      </ModulesContainer>
    </Container>
  );
};
