import React from 'react'
import { graphql } from 'gatsby'
import { StaticQuery } from 'gatsby'
import { Legal } from '../components/Legal'

export const LegalContainer: React.FC = () => (
  <StaticQuery
    query={graphql`
      query LegalContainerQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "legal-page" } } }
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
      const {
        title,
        description,
      } = data.allMarkdownRemark.edges[0].node.frontmatter
      return <Legal title={title} description={description} />
    }}
  />
)
