import React from 'react'
import PropTypes from 'prop-types'

const ProjectPostPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  console.log(data)

  const out = Object.keys(data).map(k => {
    if (k === 'modules') {
      return data[k].map(mod => {
        return Object.keys(mod).map(k => {
          return (
            <div>
              {`${k}: `}
              {mod[k].toString()}
            </div>
          )
        })
      })
    } else {
      return (
        <div>
          {`${k}: `}
          {data[k].toString()}
        </div>
      )
    }
  })

  if (data) {
    return <div>{out}</div>
  } else {
    return <div>Loading...</div>
  }
}

ProjectPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProjectPostPreview
