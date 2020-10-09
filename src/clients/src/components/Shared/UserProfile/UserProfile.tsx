import React, { ReactElement, useEffect } from 'react';
import { MdNotificationsNone } from 'react-icons/md';
import './user-profile.scss';
import NotificationDropdownList from '../NotificationsDropdown/NotificationDropdownList';
import { Notification } from '../../../types/notification';
import IconHover from '../IconHover/IconHover';
interface Props {
  name: string;
  img: string;
}

export default function UserProfile({
  name,
  img,
}: Props): ReactElement {
  return (
    <div className="user-profile">
      <img src={img} alt="" />
      <div className="user-profile-name">{name}</div>
    </div>
  );
}
