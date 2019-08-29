import React from "react";
import { Layout } from "../components/Layout";
import { FeaturedProjectRollContainer } from "../containers/FeaturedProjectRollContainer";
import { ProjectRollContainer } from "../containers/ProjectRollContainer";
import { StudioContainer } from "../containers/StudioContainer";

const IndexPage = () => {
  return (
    <Layout>
      <FeaturedProjectRollContainer />
      <ProjectRollContainer />
      <StudioContainer />
    </Layout>
  );
};

export default IndexPage;
