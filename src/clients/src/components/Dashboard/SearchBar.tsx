import React, { ReactElement } from 'react'
import Input from '../Shared/input/Input'
import InputIcon from '../Shared/InputIcon/InputIcon'
import {AiOutlineSearch} from 'react-icons/ai'
import { Event } from '../../types/event'
interface Props {
  value: string,
  onChange: (event: string) => void,
  placeholder?: string, 
}

export default function ({onChange, value, placeholder}: Props): ReactElement {
  return (
    <div className="search-bar">
      <InputIcon placeholder={placeholder} value={value} icon={<AiOutlineSearch />} onChange={value =>  onChange(value)} />
    </div>
  )
}
