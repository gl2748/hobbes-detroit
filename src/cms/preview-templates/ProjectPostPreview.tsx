import React from 'react'
import PropTypes from 'prop-types'
import { IImmutableJSType } from './CookiePagePreview'

export interface IProjectPostPreviewProps {
  entry: IImmutableJSType
  getAsset: () => void
}

export const ProjectPostPreview: React.FC<IProjectPostPreviewProps> = ({
  entry,
}: IProjectPostPreviewProps) => {
  const data = entry.getIn(['data']).toJS()

  const out = Object.keys(data).map(k => {
    if (k === 'modules') {
      return data[k].map((mod: any) => {
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
