import React from 'react'
import PropTypes from 'prop-types'
import { Cookie } from '../../components/Cookie'

export const CookiePagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS()
  if (data && data.description && data.title) {
    return (
      <div>
        <Cookie title={data.title} description={data.description} />
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

CookiePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}
