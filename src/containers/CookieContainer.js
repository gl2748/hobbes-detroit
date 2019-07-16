import React from 'react'
import { graphql } from 'gatsby'
import { StaticQuery } from 'gatsby'
import { Cookie } from '../components/Cookie'

export default () => (
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
    render={data => {
      const {
        title,
        description,
      } = data.allMarkdownRemark.edges[0].node.frontmatter
      return <Cookie title={title} description={description} />
    }}
  />
)
