// Make all graphQL queries here and pass in the results as props to dumb components, then for the CMS previews we don't use the containers, and pass CMS input in directly to the dumb component.


import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { StaticQuery } from 'gatsby'
import { Studio } from '../components/Studio'

export default () => (
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
    render={

      (data) => {
        debugger
        const {title, description, address, phone, email, social} = data.allMarkdownRemark.edges[0].node.frontmatter
        debugger
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
    }
  />
)
