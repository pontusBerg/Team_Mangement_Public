import React, { ReactElement } from 'react'
import './icon-hover.styles.scss'
interface Props {
icon: ReactElement,
onClick: () => void;   
}

export default function IconHover({icon, onClick}: Props): ReactElement {
  return (
    <button onClick={onClick} className="icon-hover">
    {icon}
    </button>
  )
}
