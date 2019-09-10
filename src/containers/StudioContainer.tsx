import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { IStudioProps, Studio } from "../components/Studio";
import { IAllMarkdownRemark, IFrontmatter } from "./interfaces";

export const StudioContainer = ({
  forwardedRef
}: {
  forwardedRef: React.Ref<HTMLDivElement>;
}) => {
  const render = (data: IAllMarkdownRemark<IFrontmatter<IStudioProps>>) => {
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
        forwardedRef={forwardedRef}
        title={title}
        description={description}
        address={address}
        phone={phone}
        email={email}
        social={social}
      />
    );
  };
  return (
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
      render={render}
    />
  );
};
