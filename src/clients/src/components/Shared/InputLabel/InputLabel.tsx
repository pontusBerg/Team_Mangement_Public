import React, { ReactElement } from 'react'
import Input from '../input/Input'
import {Event} from '../../../types/event'
import './input-label.style.css'
interface Props {
  value: string,
  onChange: (event: Event) => void; 
  label: string,
  placeholder?: string
}

export default function InputLabel({value, onChange, label, placeholder}: Props): ReactElement {
  return (
    <div className="input-label">
      <label className="input-label-label">{label}</label>
      <Input placeholder={placeholder} handleChange={event => onChange(event)} value={value} />
    </div>
  )
}
