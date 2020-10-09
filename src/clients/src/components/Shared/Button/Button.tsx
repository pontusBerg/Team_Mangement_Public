import React, { ReactElement } from 'react'
import './button.style.scss'
interface Props {
  text: string, 
  onClick: (event?: any) => void; 
  className?: string, 
  loading?: boolean,
}


export default function Button({onClick, text, className = "btn-primary", loading}: Props): ReactElement {
 
  
 
  return (
    <button className={className}  disabled={loading} onClick={(event) =>onClick(event)}>{text}</button>
  )
}
