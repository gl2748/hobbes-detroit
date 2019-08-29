import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { HeroCarousel } from "../components/HeroCarousel";
import { HobLink } from "../components/HobLink";
import { HobTypography } from "../components/HobTypography";
import { IProjectProps } from "../components/ProjectRoll";
import { IAllMarkdownRemark } from "./interfaces";

export const FeaturedProjectRollContainer: React.FC = () => {
  const render = (data: IAllMarkdownRemark<IProjectProps>): React.ReactNode => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <HeroCarousel>
        {posts.map(({ node: post }: { node: IProjectProps }) => (
          <div
            key={post.id}
            className={`${post.frontmatter.featured ? "is-featured" : ""}`}
          >
            <HobLink
              color="dark-gray"
              to={
                post.frontmatter.protectedProject
                  ? `/protected${post.fields.slug}`
                  : post.fields.slug
              }
            >
              {post.frontmatter.title}
            </HobLink>
          </div>
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
