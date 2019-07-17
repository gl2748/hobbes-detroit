import PropTypes from "prop-types"
import React from "react"
import { Cookie } from "../../components/Cookie"

export interface IStringIndex {
    [k: string]: any
}

export interface IImmutableJSType {
    getIn: (arg0: string[]) => { toJS: () => ICookieData }
}

export interface ICookiePreviewProps {
    entry: IImmutableJSType,
    getAsset: () => void
}

export interface ICookieData {
    title: string,
    description: string
}

export const CookiePagePreview: React.FC<ICookiePreviewProps> = ({ entry }: ICookiePreviewProps) => {
    const data: ICookieData = entry.getIn(["data"]).toJS()
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

