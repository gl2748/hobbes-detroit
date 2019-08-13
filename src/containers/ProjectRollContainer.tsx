import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { ProjectRoll, IProjectProps } from '../components/ProjectRoll';

export const ProjectRollContainer: React.FC = () => (
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
                featuredImage
              }
            }
          }
        }
      }
    `}
    render={(data: {
      allMarkdownRemark: { edges: [{ node: IProjectProps }] };
    }): React.ReactNode => <ProjectRoll data={data} />}
  />
);
