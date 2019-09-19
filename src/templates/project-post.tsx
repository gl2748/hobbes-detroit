import { HTMLContent } from "@components/Content";
import { HobLink as Link } from "@components/HobLink";
import { HobLogo } from "@components/HobLogo";
import { HobTypography } from "@components/HobTypography";
import { Layout } from "@components/Layout";
import { Navbar } from "@components/Navbar";
import { IProjectProps, MediaType, Project } from "@components/Project";
import { StudioContainer } from "@containers/StudioContainer";
import styled from "@emotion/styled";
import { WithAuth } from "@higherOrderComponents/WithAuth";
import { withLocation } from "@higherOrderComponents/withLocation";
import { useScrollPosition } from "@hooks/useScrollPosition";
import { graphql } from "gatsby";
import { LocationState } from "history";
import React, { useReducer, useRef, useState } from "react";
import Helmet from "react-helmet";
import breakpoints from "../breakpoints";
import { MemoizedLink } from "./MemoizedLink";
import { MemoizedLogo } from "./MemoizedLogo";

interface SideLink {
  frontmatter: {
    protectedProject: boolean;
    title: string;
    primaryColor: string;
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
      frontmatter: IProjectProps;
      childrenTransformerUploadcareMeta: ITransformerUploadcareMeta[];
    };
    prev: SideLink;
    next: SideLink;
  };
}

const PaginationContainer = styled.div<{
  bottomColor: string;
  topColor: string;
}>`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 0.625rem;
  transition: width var(--hob-transition-duration),
    height var(--hob-transition-duration);
  z-index: 10;

  :before {
    width: 1rem;
    content: "";
    display: block;
    height: 100vh;
    position: absolute;
    right: calc(100%);
  }

  &.side-pagination {
    ${breakpoints.mobile}, ${breakpoints.noHover} {
      left: 0;
      overflow: hidden;
      width: 100%;
      display: flex;
      height: 0;
    }
  }

  &:hover,
  &:focus {
    width: 3.3rem;
    ${breakpoints.mobile}, ${breakpoints.noHover} {
      width: 100%;
    }
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
        font-size: 1.75rem;

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
        background-color: ${({ topColor }) =>
          topColor || "var(--hob-color--blue)"};

        .hob-typography {
          bottom: 0;
        }

        .side-pagination__arrow {
          top: 0.875rem;
        }
      }

      &--bottom {
        bottom: 0;
        background-color: ${({ bottomColor }) =>
          bottomColor || "var(--hob-color--pink)"};

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
  color: string;
}
const SidePagination = React.memo(
  ({ prev, next }: { prev: ISideLink; next: ISideLink }) => {
    return (
      <PaginationContainer
        topColor={next.color}
        bottomColor={prev.color}
        className="side-pagination"
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
  },
  (a, b) => a.prev.to === b.prev.to && a.next.to === b.next.to
);

const Container = styled(Layout)`
  overflow-x: hidden;
  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &.main--work {
    .nav__item--Work {
      svg {
        text {
          text-decoration: underline;
        }
      }
    }
  }

  &.main--studio {
    .nav__item--Studio {
      svg {
        text {
          text-decoration: underline;
        }
      }
    }
  }

  &.main--north {
    .side-pagination {
      ${breakpoints.mobile}, ${breakpoints.noHover} {
        height: 3rem;
      }
    }
  }

  #studio,
  .footer {
    background-color: var(--hob-color--primary);
    .hob-typography {
      color: var(--hob-color-alt--primary);
    }
    .hob-letters {
      path {
        fill: var(--hob-color-alt--primary);
      }
    }

    .hob-logo {
      svg {
        fill: var(--hob-color-alt--primary);
      }
    }
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
    }
  }

  > .logo {
    position: fixed;
    bottom: 1.25rem;
    left: 1.25rem;
    z-index: 2;
    svg {
      stroke: none;
      fill: var(--hob-color--dark);
    }

    &--scrolled {
      svg {
        fill: none;
        stroke: var(--hob-color--dark);
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
  scrollYPrev: number;
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
  scrollY: 0,
  scrollYPrev: 0
};

type Action =
  | { type: "SET_SCROLL_Y"; payload: { prev: number; curr: number } }
  | { type: "SET_WINDOW_HEIGHT"; payload: number }
  | { type: "SET_POSITIONS"; payload: { [key: string]: Position } };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SCROLL_Y": {
      return {
        ...state,
        scrollY: action.payload.curr,
        scrollYPrev: action.payload.prev
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
  data,
  location: { hash }
}: IProjectPostProps & { location: LocationState }) => {
  const [
    {
      scrollY,
      scrollYPrev,
      positions: {
        nav: { bottom: navBottom = 1, top: navTop = 0 },
        studio: { top: studioTop = 0 }
      }
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const { markdownRemark: post, prev, next } = data;
  const scrollRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toProps = (p: SideLink) => ({
    color: p.frontmatter.primaryColor,
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

  useScrollPosition(
    ({ currPos, prevPos }) => {
      dispatch({
        payload: { curr: currPos.y, prev: prevPos.y },
        type: "SET_SCROLL_Y"
      });
    },
    {
      element: scrollRef,
      useWindow: false
    }
  );

  const EnhancedProjectComponent = post.frontmatter.protectedProject
    ? WithAuth(Project)
    : Project;

  const backToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  };

  const section =
    scrollY === 0 ? "home" : scrollY < studioTop ? "work" : "studio";

  const scrollDirection: "north" | "south" =
    scrollY !== 0 && scrollYPrev > scrollY ? "north" : "south";

  return (
    <Container
      forwardedRef={scrollRef}
      className={`main main--${section} main--${scrollDirection}`}
    >
      <SidePagination prev={toProps(prev)} next={toProps(next)} />
      <Navbar className={`nav`} forwardedRef={navRef}>
        <MemoizedLink
          href="/#work"
          label="Work"
          color="primary"
          height={height}
          offset={offset}
        />
        <MemoizedLink
          href="#studio"
          label="Studio"
          color="primary"
          height={height}
          offset={offset}
        />
      </Navbar>

      <MemoizedLogo
        className={`logo logo--${scrollY > 0 ? "scrolled" : "top"}`}
        unsetTypography={true}
        color="primary"
        to="/"
      >
        <HobLogo fill="var(--hob-color--secondary)" />
      </MemoizedLogo>

      <EnhancedProjectComponent
        backToTop={backToTop}
        featuredJson={post.frontmatter.featuredJson}
        modules={post.frontmatter.modules}
        content={post.html}
        team={post.frontmatter.team}
        press={post.frontmatter.press}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Case Study">
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
              content={`${post.frontmatter.metaImage}`}
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

export default withLocation(ProjectPost);

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
        metaImage
        tags
        protectedProject
        featuredJson
        team
        press
        modules {
          type
          projectBannerMedia
          hideCaptions
          bleed
          largeMediaFile
          textColumns {
            column
          }
          slides {
            slideMediaFile
            type
          }
          mediaGridMedia {
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
        primaryColor
      }
      fields {
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      frontmatter {
        protectedProject
        title
        primaryColor
      }
      fields {
        slug
      }
    }
  }
`;
