import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { IStudioProps, Studio } from "../components/Studio"
import { IAllMarkdownRemark } from "./interfaces"

export const StudioContainer = () => {
  const render = (data: IAllMarkdownRemark<IStudioProps>) => {
    const {
      title,
      description,
      address,
      phone,
      email,
      social
    } = data.allMarkdownRemark.edges[0].node.frontmatter
    return (
      <Studio
        title={title}
        description={description}
        address={address}
        phone={phone}
        email={email}
        social={social}
      />
    )
  }
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
  )
}
