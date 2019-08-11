import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export interface IProjectProps {
  title: string;
  id: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    featuredProject: {};
    protectedProject: boolean;
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
                post.frontmatter.featuredProject ? 'is-featured' : ''
              }`}
            >
              <header>
                <p>
                  <Link
                    to={
                      post.frontmatter.protectedProject
                        ? `/protected${post.fields.slug}`
                        : post.fields.slug
                    }
                  >
                    {post.frontmatter.title}
                  </Link>
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
