import React, { ReactElement, ReactNode } from 'react'
import './container.scss'
interface Props {
  children: ReactNode
  className?: string
}

export default function Container({children, className}: Props): ReactElement {
  return (
    <div className={`container ${className && className}`}>
      {children}
    </div>
  )
}
