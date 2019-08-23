import React from "react";
import { graphql } from "gatsby";
import { StaticQuery } from "gatsby";
import { Cookie } from "../components/Cookie";

export const NotFoundContainer = () => (
  <StaticQuery
    query={graphql`
      query NotFoundContainerQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "not-found-page" } } }
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
    render={data => {
      debugger;
      const {
        title,
        description
      } = data.allMarkdownRemark.edges[0].node.frontmatter;
      debugger;
      return <Cookie title={title} description={description} />;
    }}
  />
);
