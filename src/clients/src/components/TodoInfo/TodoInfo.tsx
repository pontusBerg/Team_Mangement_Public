import React, { ReactElement } from 'react';
import { format } from 'timeago.js';

interface Props {
  title: string;
  description: string;
  urgency: string;
  difficulty: string;
  category: string;
  selectedUser: string;
  profileImg?: string;
}

export default function TodoInfo({
  title,
  description,
  urgency,
  difficulty,
  category,
  selectedUser,
  profileImg,
}: Props): ReactElement {
  return (
    <div className="todo-info">
      {profileImg ? (
        <div className="todo-info-section-wrap todo-info-section-profile">
          <img className="todo-info-profile" src={profileImg} alt="" />
          <div className="todo-info-user">{selectedUser}</div>
        </div>
      ) : (
        <div className="todo-info-section-wrap todo-info-section-profile">
          <div>Unassigned</div>
        </div>
      )}
      <div className="todo-info-section-wrap">
        <div className="todo-info-title">{title}</div>
        <div className="todo-info-description">{description}</div>
      </div>
      <div className="todo-info-section-flex">
        <div className="todo-info-section-wrap">
          <div className="todo-info-label">Urgency</div>
          <div className="todo-info-urgency">{urgency}</div>
        </div>
        <div className="todo-info-section-wrap">
          <div className="todo-info-label">Difficulty</div>
          <div className="todo-info-difficulty">{difficulty}</div>
        </div>
      </div>
      <div className="todo-info-section-flex">
        <div className="todo-info-section-wrap">
          <div className="todo-info-label">Category</div>
          <div className="todo-info-category">{category}</div>
        </div>
      </div>
    </div>
  );
}
