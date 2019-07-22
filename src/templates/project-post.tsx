import React, { ReactNode, ReactComponentElement, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet, { HelmetProps, HelmetData } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/Layout'
import { Content, HTMLContent } from '../components/Content'
export interface IProjectPostTemplateProps {
  content: ReactNode
  contentComponent: HTMLContent
  description: string
  tags: string[]
  title: string
  helmet: ReactElement
}

export const ProjectPostTemplate: React.FC<IProjectPostTemplateProps> = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}: IProjectPostTemplateProps) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      {helmet || ''}
      <div>
        <div>
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul>
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

const ProjectPost = ({
  data,
}: {
  data: {
    markdownRemark: {
      html: any
      frontmatter: { description: string; title: string; tags: string[] }
    }
  }
}) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProjectPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ProjectPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProjectPost

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
      }
    }
  }
`
