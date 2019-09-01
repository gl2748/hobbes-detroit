import { graphql, Link } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../Layout";

export interface ITagProps {
  totalCount: number;
  title: string;
  tag: string;
  posts: [
    {
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
          protectedProject: boolean;
        };
      };
    }
  ];
}

export const Tag: React.FC<ITagProps> = ({
  posts,
  tag,
  title,
  totalCount
}: ITagProps) => {
  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link
        to={
          post.node.frontmatter.protectedProject
            ? `protected/${post.node.fields.slug}`
            : post.node.fields.slug
        }
      >
        <h2>{post.node.frontmatter.title} elll!</h2>
      </Link>
    </li>
  ));
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag}”`;

  return (
    <section>
      <Helmet title={`${tag} | ${title}`} />
      <div>
        <div>
          <div style={{ marginBottom: "6rem" }}>
            <h3>{tagHeader}</h3>
            <ul>{postLinks}</ul>
            <p>
              <Link to="/tags/">Browse all tags</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
