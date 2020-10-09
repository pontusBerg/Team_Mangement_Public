import React, { ReactElement } from 'react'
import Spinner from '../../../media/loading-spinner.svg'
import './loading-spinner.scss'
interface Props {
  
}

export default function LoadingSpinner({}: Props): ReactElement {
  return (
    <div className="loading-spinner-wrap">
      <img className="loading-spinner" src={Spinner} alt=""/>
    </div>
  )
}
