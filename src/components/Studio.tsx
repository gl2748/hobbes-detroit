import React from 'react'
import PropTypes from 'prop-types'
export interface IStudioProps {
  description: string
  title: string
  phone: string
  email: string
  address: string
  social: { title: string; url: string }[]
}
export const Studio: React.FC<IStudioProps> = ({
  title,
  description,
  address,
  phone,
  email,
  social,
}: IStudioProps) => {
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
