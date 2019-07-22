import React from 'react'
import PropTypes from 'prop-types'
import { Legal } from '../../components/Legal'
import { IImmutableJSType } from './CookiePagePreview'
export interface ILegalPagePreviewProps {
  entry: IImmutableJSType
  getAsset: () => void
}

export const LegalPagePreview: React.FC<ILegalPagePreviewProps> = ({
  entry,
}: ILegalPagePreviewProps) => {
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
