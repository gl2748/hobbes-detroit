import styled from "@emotion/styled";
import { Link } from "gatsby";
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

const Container = styled.div`
  min-height: 100vh;
`;

export const ProjectRoll: React.FC<IProjectRollProps> = ({
  data
}: IProjectRollProps) => {
  const { edges: posts } = data.allMarkdownRemark;
  const tempImageStyle = {
    maxWidth: "300px"
  };
  return (
    <Container id="work">
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
    </Container>
  );
};
