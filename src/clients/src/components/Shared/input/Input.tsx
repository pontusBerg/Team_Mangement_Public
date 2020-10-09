import React, { ReactElement } from 'react'
import {Event} from '../../../types/event'
import './input.style.css'
interface Props {
  handleChange: (event: Event) => void; 
  placeholder?: string, 
  value: string, 
}

export default function Input({handleChange, placeholder, value}: Props): ReactElement {
  return (
    <>
    <input className="input" placeholder={placeholder} value={value} type="text" onChange={event => handleChange(event)} />
    </>
  )
}
