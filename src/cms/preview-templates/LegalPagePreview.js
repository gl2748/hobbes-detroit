import React from 'react'
import PropTypes from 'prop-types'
import { Legal } from '../../components/Legal'

const LegalPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  if (data && data.description && data.title) {
    return (
      <div>
        <Legal title={data.title} description={data.description} />
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

export default LegalPagePreview
