import { HeroCarousel } from "@components/HeroCarousel";
import { HobLink } from "@components/HobLink";
import { IProjectProps } from "@components/ProjectRollItem";
import styled from "@emotion/styled";
import axios from "axios";
import { graphql, StaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import breakpoints from "../breakpoints";
import { IAllMarkdownRemark } from "./interfaces";

const ProjectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .hob-link.text {
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
  max-height: 80%;
  margin: 0 auto;

  .hob-typography {
    color: var(--hob-color--secondary);
  }
`;

const Project = React.memo(
  ({ post }: { post: IProjectProps }) => {
    const [animationData, setAnimationData] = useState<{
      [key: string]: any;
    } | null>(null);

    useEffect(() => {
      axios.get(post.frontmatter.featuredJson).then(({ data }) => {
        setAnimationData(data);
      });
    }, []);

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
        <HobLink
          unsetTypography={true}
          color="dark-gray"
          to={
            post.frontmatter.protectedProject
              ? `/protected${post.fields.slug}`
              : post.fields.slug
          }
        >
          <ProjectGraphic className="hero-carousel__project-graphic">
            {animationData && (
              <Lottie
                options={defaultOptions}
                isPaused={false}
                isStopped={false}
              />
            )}
          </ProjectGraphic>
        </HobLink>

        <HobLink
          className="text"
          color="dark-gray"
          to={
            post.frontmatter.protectedProject
              ? `/protected${post.fields.slug}`
              : post.fields.slug
          }
        >
          {post.frontmatter.title}
        </HobLink>
      </ProjectContainer>
    );
  },
  (a, b) => a.post.id === b.post.id
);
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
            sort: { order: DESC, fields: [frontmatter___featuredProjectSort] }
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
                  featuredProjectSort
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
