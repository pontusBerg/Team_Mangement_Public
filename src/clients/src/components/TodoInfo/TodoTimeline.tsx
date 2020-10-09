import React, { ReactElement } from 'react';
import {format} from 'timeago.js'

interface Props {
  message: string;
  name: string;
  createdAt: string;
  profileImg: string;
}

export default function TodoTimeline({
  message,
  name,
  createdAt,
  profileImg,
}: Props): ReactElement {
  return (
    <div className="timeline">
      <div className="timeline-content-wrap">
        <img className="timeline-img" src={profileImg} alt="" />
        <div className="timeline-name">{name}</div>
      </div>
      <div className="timeline-message">{message}</div>
      <div className="timeline-createdAt">{format(createdAt)}</div>
    </div>
  );
}
