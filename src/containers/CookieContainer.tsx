import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { Cookie, ICookieProps } from "../components/Cookie";
import { IAllMarkdownRemark, IFrontmatter } from "./interfaces";

export const CookieContainer = () => {
  const render = (data: IAllMarkdownRemark<IFrontmatter<ICookieProps>>) => {
    const {
      title,
      description
    } = data.allMarkdownRemark.edges[0].node.frontmatter;
    return <Cookie title={title} description={description} />;
  };
  return (
    <StaticQuery
      query={graphql`
        query CookieContainerQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "cookie-page" } } }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  description
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
