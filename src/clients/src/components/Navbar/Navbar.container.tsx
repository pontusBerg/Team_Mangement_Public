import React, { ReactElement } from 'react'
import {
  useWindowWidth,

} from '@react-hook/window-size'
import './navbar.scss'
import NavbarSmall from './NavbarSmall'
import NavbarDesktop from './NavbarDesktop'
 
interface Props {
  
}

export default function NavbarContainer({}: Props): ReactElement {

  const width = useWindowWidth()


 return width < 1024 ?
  <NavbarSmall />
  : 
  <NavbarDesktop />
 
}
