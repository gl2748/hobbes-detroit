import { Link } from "gatsby";
import { kebabCase } from "lodash";
import React, { ReactElement, ReactNode } from "react";
import { Content, HTMLContent } from "../Content";

export interface IModuleProps {
  textColumns: Array<{ column: string }>;
  bleed: boolean;
  caption: string;
  headerText: string;
  hideCaptions: boolean;
  mediaGridMedia: Array<{ caption: string; mediaGridMediaFile: string }>;
  largeMediaFile: string;
  mobileDeviceMedia: string;
  projectBannerMedia: string;
  tabletDeviceMedia: string;
  type: string;
  slides: Array<{ caption: string; slideMediaFile: string; type: string }>;
}

export interface IProjectProps {
  content: ReactNode;
  contentComponent: HTMLContent;
  description: string;
  tags: string[];
  title: string;
  helmet: ReactElement;
  featured: boolean;
  protectedProject: boolean;
  modules?: IModuleProps[];
}

export const Project: React.FC<IProjectProps> = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featured,
  protectedProject
}: IProjectProps) => {
  const PostContent = contentComponent || Content;

  return (
    <section>
      {helmet || ""}
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
