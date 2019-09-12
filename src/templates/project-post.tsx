import { HTMLContent } from "@components/Content";
import { DynamicGradientSvgText } from "@components/DynamicGradientSvgText";
import { HobLink as Link } from "@components/HobLink";
import { HobTypography } from "@components/HobTypography";
import { Layout } from "@components/Layout";
import { Navbar } from "@components/Navbar";
import { IModuleProps, MediaType, Project } from "@components/Project";
import { StudioContainer } from "@containers/StudioContainer";
import styled from "@emotion/styled";
import { WithAuth } from "@higherOrderComponents/WithAuth";
import { useScrollPosition } from "@hooks/useScrollPosition";
import { graphql } from "gatsby";
import React, { useReducer, useRef, useState } from "react";
import Helmet from "react-helmet";
import breakpoints from "../breakpoints";

interface SideLink {
  frontmatter: {
    protectedProject: boolean;
    title: string;
  };
  fields: {
    slug: string;
  };
}

export interface IImageInfo {
  color_mode: string;
  dpi: [number, number];
  format: "PNG" | "JPEG" | "GIF";
  height: number;
  sequence: boolean;
  width: number;
}

export interface ITransformerUploadcareMeta {
  mime_type: MediaType;
  uuid: string;
  image_info?: IImageInfo;
  original_filename: string;
}
export interface IProjectPostProps {
  data: {
    markdownRemark: {
      html: any;
      frontmatter: {
        description: string;
        title: string;
        imageMeta?: string;
        tags: string[];
        protectedProject: boolean;
        featured: boolean;
        featuredJson: string;
        modules: IModuleProps[];
      };
      childrenTransformerUploadcareMeta: ITransformerUploadcareMeta[];
    };
    prev: SideLink;
    next: SideLink;
  };
}

const PaginationContainer = styled.div<{ scrollDirection: "north" | "south" }>`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 0.625rem;
  transition: width var(--hob-transition-duration),
    height var(--hob-transition-duration);
  z-index: 10;

  &.side-pagination {
    ${breakpoints.mobile}, ${breakpoints.noHover} {
      left: 0;
      height: ${({ scrollDirection }) =>
        scrollDirection === "north" ? 2 : 0}rem;
      overflow: hidden;
      width: 100%;
      display: flex;
    }

    &--northbound {
      ${breakpoints.mobile}, ${breakpoints.noHover} {
        height: 3rem;
      }
    }
  }

  &:hover,
  &:focus {
    width: 2.5rem;
  }

  .side-pagination {
    &__arrow {
      position: absolute;
      left: 0.5rem;
      font-size: 1.3rem;

      ${breakpoints.mobile}, ${breakpoints.noHover} {
        position: unset;
      }
    }

    &__link {
      position: absolute;
      height: 50%;
      right: 0;
      width: 100%;
      text-decoration: none;

      ${breakpoints.mobile}, ${breakpoints.noHover} {
        width: 50%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &--top {
          order: 1;
          flex-direction: row-reverse;

          > * {
            margin-left: 1rem;
          }
        }

        &--bottom {
          > * {
            margin-right: 1rem;
          }
        }
      }

      .hob-typography {
        display: block;
        transform: rotate(-90deg);
        transform-origin: 0 0;
        white-space: nowrap;
        position: absolute;
        left: 0.5rem;

        ${breakpoints.mobile}, ${breakpoints.noHover} {
          transform: rotate(0deg);
          position: unset;
          flex: 2;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      &--top {
        top: 0;
        background-color: var(--hob-color--blue);

        .hob-typography {
          bottom: 0;
        }

        .side-pagination__arrow {
          top: 0.875rem;
        }
      }

      &--bottom {
        bottom: 0;
        background-color: var(--hob-color--pink);

        .hob-typography {
          bottom: 2.625rem;
        }

        .side-pagination__arrow {
          bottom: 0.875rem;
        }
      }
    }
  }
`;

interface ISideLink {
  to: string;
  label: string;
}
const SidePagination = ({
  prev,
  next
}: {
  prev: ISideLink;
  next: ISideLink;
}) => {
  const [scrollDirection, setScrollDirection] = useState<"north" | "south">(
    "south"
  );

  useScrollPosition(({ prevPos: { y: prevY }, currPos: { y: currY } }) => {
    setScrollDirection(prevY < 0 && prevY < currY ? "north" : "south");
  });

  return (
    <PaginationContainer
      scrollDirection={scrollDirection}
      className={`side-pagination side-pagination--${scrollDirection}bound`}
    >
      <Link
        to={next.to}
        color="primary"
        className="side-pagination__link side-pagination__link--top"
        unsetTypography={true}
      >
        <span className="side-pagination__arrow">→</span>
        <HobTypography variant="link">{next.label}</HobTypography>
      </Link>

      <Link
        to={prev.to}
        color="primary"
        className="side-pagination__link side-pagination__link--bottom"
        unsetTypography={true}
      >
        <span className="side-pagination__arrow">←</span>
        <HobTypography variant="link">{prev.label}</HobTypography>
      </Link>
    </PaginationContainer>
  );
};

const Container = styled(Layout)`
  overflow-x: hidden;

  #studio {
    background-color: var(--hob-color--primary);
    color: var(--hob-color-alt--primary);
  }

  .nav {
    position: fixed;
    top: 1.25rem;
    right: 1.25rem;
    background-color: transparent;

    a {
      &:hover,
      &:focus {
        opacity: 0.5;
      }

      svg {
        text {
          text-decoration: underline;
        }
      }
    }
  }
`;
interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface State {
  scrollY: number;
  positions: {
    studio: Position;
    nav: Position;
  };
}

const initialState: State = {
  positions: {
    nav: { bottom: 0, top: 0 },
    studio: { top: 0 }
  },
  scrollY: 0
};

type Action =
  | { type: "SET_SCROLL_Y"; payload: number }
  | { type: "SET_WINDOW_HEIGHT"; payload: number }
  | { type: "SET_POSITIONS"; payload: { [key: string]: Position } };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SCROLL_Y": {
      return {
        ...state,
        scrollY: action.payload
      };
    }
    case "SET_WINDOW_HEIGHT": {
      return {
        ...state
      };
    }
    case "SET_POSITIONS": {
      return {
        ...state,
        positions: {
          ...state.positions,
          ...action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
};

const ProjectPost: React.FC<IProjectPostProps> = ({
  data
}: IProjectPostProps) => {
  const [
    {
      scrollY,
      positions: {
        nav: { bottom: navBottom = 1, top: navTop = 0 },
        studio: { top: studioTop = 0 }
      }
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const { markdownRemark: post, prev, next } = data;
  const studioRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toProps = (p: SideLink) => ({
    label: p.frontmatter.title,
    to: `${p.frontmatter.protectedProject ? "/protected" : ""}${p.fields.slug}`
  });

  React.useEffect(() => {
    if (navRef.current === null || studioRef.current === null) {
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    dispatch({
      payload: {
        nav: {
          bottom: navRect.bottom,
          top: navRect.top
        },
        studio: {
          top: studioRef.current.offsetTop
        }
      },
      type: "SET_POSITIONS"
    });
  }, [
    studioRef.current && studioRef.current.offsetTop,
    navRef.current && navRef.current.getBoundingClientRect().top
  ]);

  const offset = Math.max(
    0,
    ((scrollY + navBottom - studioTop) / (navBottom - navTop)) * 100 || 0
  );
  const height = 28;

  useScrollPosition(({ currPos }) => {
    dispatch({ type: "SET_SCROLL_Y", payload: currPos.y * -1 });
  });

  const EnhancedProjectComponent = post.frontmatter.protectedProject
    ? WithAuth(Project)
    : Project;

  const link = (href: string, label: string) => (
    <Link color="secondary" href={href} unsetTypography={true}>
      <DynamicGradientSvgText
        height={height}
        offset={offset}
        from="var(--hob-color--dark)"
        to="var(--hob-color--light)"
      >
        {label}
      </DynamicGradientSvgText>
    </Link>
  );
  return (
    <Container>
      <SidePagination prev={toProps(prev)} next={toProps(next)} />
      <Navbar className={`nav`} forwardedRef={navRef}>
        {link("/#work", "Work")}
        {link("#studio", "Studio")}
      </Navbar>
      <EnhancedProjectComponent
        featuredJson={post.frontmatter.featuredJson}
        modules={post.frontmatter.modules}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <html lang="en" />
            <meta property="og:type" content="business.business" />
            <meta property="og:title" content={`${post.frontmatter.title}`} />
            <meta
              property="og:image"
              content={`${post.frontmatter.imageMeta}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        protectedProject={post.frontmatter.protectedProject}
        featured={post.frontmatter.featured}
        mediaMetadata={post.childrenTransformerUploadcareMeta}
      />
      <StudioContainer forwardedRef={studioRef} />
    </Container>
  );
};

export default ProjectPost;

// The $id param here comes from gatsby-node.js createPage method with a context property in the first argument.
export const pageQuery = graphql`
  query ProjectPostByID($id: String!, $prevId: String!, $nextId: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        imageMeta
        tags
        protectedProject
        featuredJson
        modules {
          headerText
          type
          projectBannerMedia
          hideCaptions
          bleed
          caption
          largeMediaFile
          mobileDeviceMedia
          tabletDeviceMedia
          textColumns {
            column
          }
          slides {
            caption
            slideMediaFile
            type
          }
          mediaGridMedia {
            caption
            mediaGridMediaFile
          }
        }
      }
      childrenTransformerUploadcareMeta {
        mime_type
        uuid
        image_info {
          color_mode
          dpi
          format
          height
          sequence
          width
        }
        original_filename
      }
    }
    prev: markdownRemark(id: { eq: $prevId }) {
      frontmatter {
        protectedProject
        title
      }
      fields {
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      frontmatter {
        protectedProject
        title
      }
      fields {
        slug
      }
    }
  }
`;
