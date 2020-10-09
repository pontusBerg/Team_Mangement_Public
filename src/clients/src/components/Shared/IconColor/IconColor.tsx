import React, { ReactElement } from 'react'
import './icon-color.style.scss'
interface Props {
icon: ReactElement,
onClick: () => void;   
}

export default function IconColor({icon, onClick}: Props): ReactElement {
  return (
    <button onClick={onClick} className="icon-color">
    {icon}
    </button>
  )
}
