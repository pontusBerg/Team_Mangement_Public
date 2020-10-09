import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js'
interface Props {
  description: string;
  name: string;
  profileImg: string;
  todoUrl: string;
  createdAt: Date, 
}

export default function NotificationCard({
  description,
  name,
  profileImg,
  todoUrl,
  createdAt,
}: Props): ReactElement {
  return (
    <Link to={`/todo/${todoUrl}`}>
      <div className="dropdown-notification-card">
        <img
          className="dropdown-notification-card-img"
          src={profileImg}
          alt=""
        />
        <div className="dropdown-notification-card-text-content">
          <div className="dropdown-notification-card-name">{name}</div>
          <div className="dropdown-notification-card-description">
            {description}
          </div>
        </div>
        <div className="dropdown-notification-card-createdAt">
          {format(createdAt)}
        </div>
      </div>
    </Link>
  );
}
