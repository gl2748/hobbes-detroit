import React, { ReactNode, ReactElement } from 'react';
import { kebabCase } from 'lodash';
import { Content, HTMLContent } from '../components/Content';
import { Link } from 'gatsby';
import './post.scss';

export interface IProjectProps {
  content: ReactNode;
  contentComponent: HTMLContent;
  description: string;
  tags: string[];
  title: string;
  helmet: ReactElement;
}

export const Project: React.FC<IProjectProps> = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}: IProjectProps) => {
  const PostContent = contentComponent || Content;

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
  );
};
