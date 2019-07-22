import React from "react";
import { Layout } from "../components/Layout";

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
