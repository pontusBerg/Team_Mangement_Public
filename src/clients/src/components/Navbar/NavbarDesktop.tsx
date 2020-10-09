import React, { ReactElement } from 'react'
import NavContent from './NavContent'

interface Props {
  
}

export default function NavbarDesktop({}: Props): ReactElement {
  
  const handleNavSectionClick = () => {

  }
  
  return (
    <div className="navbar">
      <NavContent onNavSectionClick={handleNavSectionClick} />
    </div>
  )
}
