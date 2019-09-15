import { MediaType } from "@components/Project";
import styled from "@emotion/styled";
import React from "react";
import { HobVideo } from ".";

export default {
  title: "Video"
};

const Container = styled.div`
  width: 50%;
`;

export const demo = () => (
  <Container>
    <HobVideo
      source="https://ucarecdn.com/edc4d433-be18-4b56-a07f-bc4de67b56d6/"
      mimeType={MediaType.MP4}
    />
  </Container>
);
