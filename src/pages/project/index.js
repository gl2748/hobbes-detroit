import React from 'react'

import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll';

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>
            Latest Projects
          </h1>
        </div>
        <section >
          <div >
            <div >
              <ProjectRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
