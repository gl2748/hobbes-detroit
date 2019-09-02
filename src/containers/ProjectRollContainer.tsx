import { graphql, StaticQuery } from "gatsby";
import React from "react";
import { IProjectProps, ProjectRoll } from "../components/ProjectRoll";
import { IAllMarkdownRemark } from "./interfaces";

export const ProjectRollContainer: React.FC = () => {
  const render = (data: IAllMarkdownRemark<IProjectProps>): React.ReactNode => (
    <ProjectRoll data={data} />
  );
  return (
    <StaticQuery
      query={graphql`
        query ProjectRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "project-post" } } }
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
                  protectedProject
                  featuredJson
                  indexSvg
                  primaryColor
                  secondaryColor
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
