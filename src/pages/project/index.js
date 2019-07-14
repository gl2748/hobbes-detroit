import React from 'react'

import Layout from '../../components/Layout'
import ProjectRoll from '../../components/ProjectRoll';

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
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
