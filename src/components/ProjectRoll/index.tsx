import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

export interface IProjectProps {
  title: string;
  id: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    featured: {};
    protectedProject: boolean;
    featuredJson: {};
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
  data
}: IProjectRollProps) => {
  const { edges: posts } = data.allMarkdownRemark;
  const tempImageStyle = {
    maxWidth: "300px"
  };
  return (
    <div>
      {posts &&
        posts.map(({ node: post }: { node: IProjectProps }) => (
          <div key={post.id}>
            <article
              className={`${post.frontmatter.featured ? "is-featured" : ""}`}
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
