import React, { ReactElement, useState} from 'react'
import HamburgerBars from './HamburgerBars'
import './navbar.scss'
import NavContent from './NavContent'
interface Props {
  
}

export default function NavbarSmall({}: Props): ReactElement {


  const [toggled, setToggled] = useState(false)
  
  const handleClick = () => {
    setToggled(!toggled)
  }


  return (
    <div className="nav-small-device">
      <div className="nav-small-device-top-bar">
      <HamburgerBars toggled={toggled} onClick={handleClick} />
      </div>
      {toggled && 
        <NavContent onNavSectionClick={handleClick} />
      }
    </div>
  )
}
