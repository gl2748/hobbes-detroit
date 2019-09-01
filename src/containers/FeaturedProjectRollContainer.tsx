import styled from "@emotion/styled";
import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { GatsbyLink } from "../components/GatsbyLink";
import { HeroCarousel } from "../components/HeroCarousel";
import { HobTypography } from "../components/HobTypography";
import { IProjectProps } from "../components/ProjectRoll";
import { IAllMarkdownRemark } from "./interfaces";

const ProjectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .hob-link {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
`;

const ProjectGraphic = styled.div`
  .hob-typography {
    color: var(--hob-color--secondary);
  }
`;

export const FeaturedProjectRollContainer: React.FC = () => {
  const render = (data: IAllMarkdownRemark<IProjectProps>): React.ReactNode => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <HeroCarousel>
        {posts.map(({ node: post }: { node: IProjectProps }) => (
          <ProjectContainer
            key={post.id}
            className={`hero-carousel__project ${
              post.frontmatter.featured ? "is-featured" : ""
            }`}
          >
            <ProjectGraphic className="hero-carousel__project-graphic">
              <HobTypography variant="body1">
                {post.frontmatter.featuredJson}
              </HobTypography>
            </ProjectGraphic>
            <GatsbyLink
              color="dark-gray"
              to={
                post.frontmatter.protectedProject
                  ? `/protected${post.fields.slug}`
                  : post.fields.slug
              }
            >
              {post.frontmatter.title}
            </GatsbyLink>
          </ProjectContainer>
        ))}
      </HeroCarousel>
    );
  };

  return (
    <StaticQuery
      query={graphql`
        query featuredRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
              frontmatter: {
                templateKey: { eq: "project-post" }
                featured: { eq: true }
              }
            }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featured
                  featuredJson
                }
              }
            }
          }
        }
      `}
      render={render}
    />
  );
};
