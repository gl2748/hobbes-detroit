import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import ProjectRoll from '../components/ProjectRoll'

export const IndexPageTemplate = ({
  title,
  description,
  address,
  phone,
  email,
  social
}) => {
return (
  <div>
    <div>Featured post gallery goes here</div>
    <div>Project Roll:</div>
    <ProjectRoll />
    <h1>
      {title}
    </h1>
      <p>{description}</p>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{social[0].title}</p>
      <p>{social[0].url}</p>
  </div>
)}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        address={frontmatter.address}
        email={frontmatter.email}
        phone={frontmatter.phone}
        social={frontmatter.social}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
`
