import React from 'react';
import { Layout } from '../components/Layout';
import { ProjectRollContainer } from '../containers/ProjectRollContainer';
import { FeaturedProjectRollContainer } from '../containers/FeaturedProjectRollContainer';
import { StudioContainer } from '../containers/StudioContainer';

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div>Featured post gallery goes here</div>
        <FeaturedProjectRollContainer />
        <ProjectRollContainer />
        <StudioContainer />
      </div>
    </Layout>
  );
};

export default IndexPage;
