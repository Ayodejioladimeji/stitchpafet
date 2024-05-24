import React from 'react'

interface Props {
    title: string
}

const Breadcumb = (props: Props) => {
    return (
        <div className="breadcumb">
            <h2>{props?.title}</h2>
        </div>
    )
}

export default Breadcumb
