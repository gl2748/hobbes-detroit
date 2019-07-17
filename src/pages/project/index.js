import React from 'react'

import { Layout } from '../../components/Layout'
import { ProjectRollContainer } from '../../containers/ProjectRollContainer'

export default class ProjectIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Latest Projects</h1>
        </div>
        <section>
          <div>
            <div>
              <ProjectRollContainer />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
