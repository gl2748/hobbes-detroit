import React from "react";
import { graphql } from "gatsby";
import { StaticQuery } from "gatsby";
import { Studio } from "../components/Studio";

export const StudioContainer = () => (
  <StaticQuery
    query={graphql`
      query StudioContainerQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "index-page" } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                description
                address
                phone
                email
                social {
                  url
                  title
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        title,
        description,
        address,
        phone,
        email,
        social
      } = data.allMarkdownRemark.edges[0].node.frontmatter;
      return (
        <Studio
          title={title}
          description={description}
          address={address}
          phone={phone}
          email={email}
          social={social}
        />
      );
    }}
  />
);
