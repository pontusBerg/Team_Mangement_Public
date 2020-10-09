import React, { ReactElement } from 'react';
import { format } from 'timeago.js';

interface Props {
  message: string;
  createdAt: Date;
  profileImg: string;
  name: string;
}

export default function PublicChatMessage({
  message,
  createdAt,
  profileImg,
  name,
}: Props): ReactElement {



  return (
    <div className="public-chat-message-card">
      <img
        className="public-chat-message-card-profile"
        src={profileImg}
        alt=""
      />
      <div className="public-chat-message-card-text-content">
        <div className="public-chat-message-card-name">{name}</div>
        <div className="public-chat-message-card-message">{message}</div>
      </div>
      <div className="public-chat-message-card-created-at">
        {format(createdAt)}
      </div>
    </div>
  );
}
