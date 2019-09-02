import styled from "@emotion/styled";
import axios from "axios";
import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Lottie from "react-lottie";
import breakpoints from "../breakpoints";
import { GatsbyLink } from "../components/GatsbyLink";
import { HeroCarousel } from "../components/HeroCarousel";
import { IProjectProps } from "../components/ProjectRollItem";
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
    ${breakpoints.mobile} {
      bottom: 3rem;
    }
  }
`;

const ProjectGraphic = styled.div`
  .hob-typography {
    color: var(--hob-color--secondary);
  }
`;

const Project = ({ post }: { post: IProjectProps }) => {
  const [animationData, setAnimationData] = useState<{
    [key: string]: any;
  } | null>(null);

  axios.get(post.frontmatter.featuredJson).then(({ data }) => {
    setAnimationData(data);
  });

  const defaultOptions = {
    animationData,
    autoplay: true,
    loop: true
  };
  return (
    <ProjectContainer
      className={`hero-carousel__project ${
        post.frontmatter.featured ? "is-featured" : ""
      }`}
    >
      <ProjectGraphic className="hero-carousel__project-graphic">
        {animationData && (
          <Lottie options={defaultOptions} height={400} width={400} />
        )}
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
  );
};
export const FeaturedProjectRollContainer: React.FC = () => {
  const render = (data: IAllMarkdownRemark<IProjectProps>): React.ReactNode => {
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <HeroCarousel>
        {posts.map(({ node: post }: { node: IProjectProps }) => (
          <Project key={post.id} post={post} />
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
