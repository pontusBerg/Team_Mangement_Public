import Icon from '../icon/Icon'
import './input-icon.scss'
import React, { ReactElement } from 'react'

interface Props {
 onChange: (event: string) => void;  
 icon: React.ReactElement,
 value: string,
 type?: string,
 placeholder?: string
}

export default function InputIcon({placeholder, onChange, icon, value, type = "text"}: Props): ReactElement {
  return (
    <div className="input-icon">
      <Icon icon={icon} />
      <input placeholder={placeholder} value={value} onChange={event => onChange(event.target.value)} type={type} />
    </div>
  )
}
