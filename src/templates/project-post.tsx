import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { HTMLContent } from '../components/Content';
import { Project } from '../components/Project';
import { WithAuth } from '../components/WithAuth';

export interface IProjectPostProps {
  data: {
    markdownRemark: {
      html: any;
      frontmatter: {
        description: string;
        title: string;
        tags: string[];
        protectedProject: boolean;
        featured: boolean;
      };
    };
  };
}

const ProjectPost: React.FC<IProjectPostProps> = ({
  data,
}: IProjectPostProps) => {
  const { markdownRemark: post } = data;

  const EnhancedProjectComponent = post.frontmatter.protectedProject
    ? WithAuth(Project)
    : Project;
  return (
    <Layout>
      <EnhancedProjectComponent
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate='%s | Blog'>
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name='description'
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        protectedProject={post.frontmatter.protectedProject}
        featured={post.frontmatter.featured}
      />
    </Layout>
  );
};

export default ProjectPost;

// The $id param here comes from gatsby-node.js createPage method with a context property in the first argument.
export const pageQuery = graphql`
  query ProjectPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        protectedProject
      }
    }
  }
`;
