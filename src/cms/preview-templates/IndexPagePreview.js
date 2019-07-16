import React from 'react'
import PropTypes from 'prop-types'
import ProjectRoll from '../../containers/ProjectRollContainer'
import { Studio } from '../../components/Studio'

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  if (
    data &&
    data.description &&
    data.title &&
    data.phone &&
    data.email &&
    data.address &&
    data.social[0]
  ) {
    return (
      <div>
        <ProjectRoll />
        <Studio
          title={data.title}
          description={data.description}
          phone={data.phone}
          email={data.email}
          address={data.address}
          social={data.social}
        />
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
