import React from 'react'
import PropTypes from 'prop-types'

export const Studio = ({
  title,
  description,
  address,
  phone,
  email,
  social,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{social[0].title}</p>
      <p>{social[0].url}</p>
    </div>
  )
}

Studio.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })
  ),
}
