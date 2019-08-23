import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { Tag } from "../components/Tag";

export interface ITagTemplateProps {
  pageContext: {
    tag: string;
  };

  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: [
        {
          node: {
            fields: {
              slug: string;
            };
            frontmatter: {
              title: string;
              protectedProject: boolean;
            };
          };
        }
      ];
    };
  };
}

const TagTemplate: React.FC<ITagTemplateProps> = (props: ITagTemplateProps) => {
  const posts = props.data.allMarkdownRemark.edges;
  const tag = props.pageContext.tag;
  const title = props.data.site.siteMetadata.title;
  const totalCount = props.data.allMarkdownRemark.totalCount;
  return (
    <Layout>
      <Tag totalCount={totalCount} title={title} tag={tag} posts={posts} />
    </Layout>
  );
};

export default TagTemplate;

// The $tag param here comes from gatsby-node.js createPage method with a context property in its param.
export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            protectedProject
          }
        }
      }
    }
  }
`;
