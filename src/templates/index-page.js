import React from 'react'
import Layout from '../components/Layout'
import ProjectRoll from '../components/ProjectRoll'
import StudioContainer from '../containers/StudioContainer'

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div>Featured post gallery goes here</div>
        <ProjectRoll />
        <StudioContainer />
      </div>
    </Layout>
  )
}

export default IndexPage