import React, { ReactElement } from 'react'

interface Props {
  onClick: () => void
  toggled: boolean
}

export default function HamburgerBars({onClick, toggled}: Props): ReactElement {
  return (
    <div onClick={onClick} className="nav-trigger-area">
    <div className={toggled ? "hamburger-bar-toggled hamburger-bar" : "hamburger-bar" }></div>
    <div className={toggled ? "hamburger-bar-toggled hamburger-bar" : "hamburger-bar" }></div>
    <div className={toggled ? "hamburger-bar-toggled hamburger-bar" : "hamburger-bar" }></div>
  </div>
  )
}
