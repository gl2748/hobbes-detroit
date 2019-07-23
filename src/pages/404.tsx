import React from 'react';
import { Layout } from '../components/Layout';
import { NotFoundContainer } from '../containers/NotFoundContainer';

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <NotFoundContainer />
    </Layout>
  );
};

export default NotFoundPage;
