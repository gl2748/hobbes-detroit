import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import breakpoints from "../breakpoints";
import { HTMLContent } from "../components/Content";
import { GatsbyLink as Link } from "../components/GatsbyLink";
import { HobTypography } from "../components/HobTypography";
import { Layout } from "../components/Layout";
import { Project } from "../components/Project";
import { WithAuth } from "../higherOrderComponents/WithAuth";

interface SideLink {
  frontmatter: {
    protectedProject: boolean;
    title: string;
  };
  fields: {
    slug: string;
  };
}
export interface IProjectPostProps {
  data: {
    markdownRemark: {
      html: any;
      frontmatter: {
        description: string;
        title: string;
        tags: string[];
        protectedProject: boolean;
        featured: boolean;
      };
    };
    prev: SideLink;
    next: SideLink;
  };
}

const PaginationContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 0.625rem;
  transition: width var(--hob-transition-duration);
  z-index: 4;

  ${breakpoints.mobile} {
    bottom: 0;
    height: 0;
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
    }

    &__link {
      position: absolute;
      height: 50%;
      right: 0;
      width: 100%;

      .hob-typography {
        display: block;
        transform: rotate(-90deg);
        transform-origin: 0 0;
        white-space: nowrap;
        position: absolute;
        left: 0.5rem;
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
  return (
    <PaginationContainer className="side-pagination">
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

const ProjectPost: React.FC<IProjectPostProps> = ({
  data
}: IProjectPostProps) => {
  const { markdownRemark: post, prev, next } = data;
  const toProps = (p: SideLink) => ({
    label: p.frontmatter.title,
    to: `${p.frontmatter.protectedProject ? "/protected" : ""}${p.fields.slug}`
  });

  const EnhancedProjectComponent = post.frontmatter.protectedProject
    ? WithAuth(Project)
    : Project;
  return (
    <Layout>
      <SidePagination prev={toProps(prev)} next={toProps(next)} />
      <EnhancedProjectComponent
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
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        protectedProject={post.frontmatter.protectedProject}
        featured={post.frontmatter.featured}
      />
    </Layout>
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
        tags
        protectedProject
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
