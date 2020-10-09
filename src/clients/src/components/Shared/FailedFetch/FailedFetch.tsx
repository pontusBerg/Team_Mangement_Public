import React, { ReactElement } from 'react'
import Button from '../Button/Button'
import './failed-fetch.scss'
interface Props {
  text: string, 
  onClick: () => void;
}

export default function FailedFetch({text, onClick}: Props): ReactElement {
  return (
    <div className="failed-fetch">
      <div className="failed-fetch-title">{text}</div>
      <Button onClick={onClick} className="btn-primary" text="Try again"/>
    </div>
  )
}
