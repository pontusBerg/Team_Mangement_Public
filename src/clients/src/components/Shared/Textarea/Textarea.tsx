import React, { ReactElement } from 'react'
import {Event} from '../../../types/event'
import './textarea.style.css'
interface Props {
  onChange: (event: Event) => void; 
  value: string,
  label?:string,
  placeholder?: string, 
}

export default function Textarea({onChange, value, label, placeholder}: Props): ReactElement {
  return (
    <div className="textarea-wrap">
      {label && 
      <label className="textarea-label" htmlFor="">{label}</label>
      }
      <textarea placeholder={placeholder} className="textarea" value={value} onChange={event => onChange(event)} name="" id=""></textarea>
    </div>
  )
}
