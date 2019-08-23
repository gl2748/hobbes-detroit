import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { ILegalProps, Legal } from "../components/Legal"
import { IAllMarkdownRemark, IFrontmatter } from "./interfaces"

export const LegalContainer: React.FC = () => {
  const render = (data: IAllMarkdownRemark<IFrontmatter<ILegalProps>>) => {
    const {
      title,
      description
    } = data.allMarkdownRemark.edges[0].node.frontmatter
    return <Legal title={title} description={description} />
  }
  return (
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
      render={render}
    />
  )
}
