import React from 'react'
import PropTypes from 'prop-types'
import Img, { FluidObject } from 'gatsby-image'

export interface IPreviewCompatibleImageProps {
  imageInfo: {
    alt: string
    childImageSharp?: {
      fluid: FluidObject
    }
    style?: {}
    image: {
      childImageSharp?: {
        fluid: FluidObject
      }
    }
  }
}

export const PreviewCompatibleImage: React.FC<IPreviewCompatibleImageProps> = ({
  imageInfo,
}: IPreviewCompatibleImageProps) => {
  const imageStyle = { borderRadius: '5px' }
  const { alt = '', childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  return null
}
