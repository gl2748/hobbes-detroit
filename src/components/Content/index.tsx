import PropTypes from "prop-types";
import React from "react";

export interface IContentProps {
  content: string;
  className: string;
}

export const HTMLContent: React.FC<IContentProps> = ({
  content,
  className
}) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

export const Content: React.FC<IContentProps> = ({ content, className }) => (
  <div className={className}>{content}</div>
);

HTMLContent.propTypes = Content.propTypes;
