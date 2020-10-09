import React, { ReactElement } from 'react';
import { format, render, cancel, register } from 'timeago.js';

import {
  AiOutlineUser,
  AiOutlineSync,
  AiOutlineCalendar,
  AiOutlineConsoleSql,
} from 'react-icons/ai';
import './todo-card.scss';
import { Link } from 'react-router-dom';
interface Props {
  title: string;
  urgency: string;
  difficulty: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  category: string;
  triggerPopup: boolean;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function TodoCard({
  title,
  urgency,
  difficulty,
  user,
  createdAt,
  updatedAt,
  category,
  id,
  onMouseEnter,
  onMouseLeave,
  triggerPopup,
}: Props): ReactElement {
  return (
    <div onMouseEnter={(event) => onMouseEnter(event)} onMouseLeave={(event) => onMouseLeave(event)} className="todo-card">
      <Link to={`/todo/${id}`}>
        <div className="todo-card-left">
          <div className="todo-card-title">{title}</div>
          {/*       <div className="todo-card-ranges">
          <div className="todo-card-range">
            <div className="todo-card-range-title">Urgency</div>
            <div className="todo-card-range-number">{urgency}</div>
          </div>
          <div className="todo-card-range">
            <div className="todo-card-range-title">Difficulty</div>
            <div className="todo-card-range-number">{difficulty}</div>
          </div>
        </div> */}
        </div>
        {triggerPopup && (
          <div className="todo-card-stats">
            <div className="todo-card-stat">
              <AiOutlineUser className="todo-card-icon" />
              {user}
            </div>
            <div className="todo-card-stat">
              <AiOutlineCalendar className="todo-card-icon" />
              {format(createdAt)}
            </div>
            <div className="todo-card-stat">
              <AiOutlineSync className="todo-card-icon" />
              {format(updatedAt)}
            </div>
            <div className="todo-card-stat">
              <AiOutlineConsoleSql className="todo-card-icon" />
              {category}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}
