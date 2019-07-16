import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

export const ProjectRoll = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const tempImageStyle = {
    maxWidth: '300px',
  }
  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <div key={post.id}>
            <article
              className={`${
                post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                {post.frontmatter.featuredimage ? (
                  <div style={tempImageStyle}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <p>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </p>
                <p>
                  <span>{post.frontmatter.date}</span>
                </p>
              </header>
            </article>
          </div>
        ))}
    </div>
  )
}

ProjectRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
