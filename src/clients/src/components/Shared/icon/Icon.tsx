import React, { ReactElement } from 'react'

interface Props {
icon: React.ReactElement
}

export default function Icon({icon}: Props): ReactElement {
  return (
    <>
    {icon}
    </>
  )
}
