import React, { ReactElement, useState, useRef, useEffect } from 'react'
import {Notification} from '../../../types/notification'
import NotificationCard from './NotificationCard'
import './notifications.style.scss'
import NotificationCardContainer from './NotificationCard.container'
import { create } from 'domain'
interface Props {
    notifications: Notification[]
    onClick: () => void;
}

export default function NotificationDropdownList({notifications, onClick}: Props): ReactElement {

  const [toggleNotifications, setToggleNotifications] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  
  
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setToggleNotifications(false);
        }
      }
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  
  return (
    <div onClick={onClick} className="notifications-dropdown-list"> 
     {notifications.map(({_id, description, todo, seen, createdAt, createdBy: {name, profileImg} }) => {
         return <NotificationCardContainer id={_id} seen={seen} createdAt={createdAt} todoUrl={todo} description={description} name={name} profileImg={profileImg} />
       }
     )}
    </div>
  )


}
