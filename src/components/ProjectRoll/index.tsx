import styled from "@emotion/styled";
import React from "react";
import { IProjectProps, ProjectRollItem } from "../ProjectRollItem";

export interface IProjectRollProps {
  data: {
    allMarkdownRemark: {
      edges: [{ node: IProjectProps }];
    };
  };
}

const Container = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  background-color: var(--hob-color--dark);
  padding: 6rem 1.25rem 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`;

export const ProjectRoll: React.FC<IProjectRollProps> = ({
  data
}: IProjectRollProps) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Container id="work">
      {posts &&
        posts.map(({ node: post }: { node: IProjectProps }, index: number) => (
          <ProjectRollItem post={post} key={post.id} index={index} />
        ))}
    </Container>
  );
};
