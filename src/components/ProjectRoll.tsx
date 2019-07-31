import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  PreviewCompatibleImage,
  IPreviewCompatibleImageProps,
} from './PreviewCompatibleImage';

export interface IProjectProps {
  title: string;
  id: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    featuredPost: {};
    featuredImage: {};
    date: string;
    title: string;
  };
}

export interface IProjectRollProps {
  data: {
    allMarkdownRemark: {
      edges: [{ node: IProjectProps }];
    };
  };
}

export const ProjectRoll: React.FC<IProjectRollProps> = ({
  data,
}: IProjectRollProps) => {
  const { edges: posts } = data.allMarkdownRemark;
  const tempImageStyle = {
    maxWidth: '300px',
  };
  return (
    <div>
      {posts &&
        posts.map(({ node: post }: { node: IProjectProps }) => (
          <div key={post.id}>
            <article
              className={`${
                post.frontmatter.featuredPost ? 'is-featured' : ''
              }`}
            >
              <header>
                {post.frontmatter.featuredImage ? (
                  <div style={tempImageStyle}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredImage,
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
  );
};
