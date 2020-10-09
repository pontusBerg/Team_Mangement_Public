import React, { ReactElement, useEffect, useRef, useState } from 'react';
import NotificationCard from './NotificationCard';
import { profile } from 'console';
import { filterTodos } from '../../../redux/user-todos/user-todo.actions';
import { updateOneTodo } from '../../../utils/api/todos';
import { RouteComponentProps } from 'react-router-dom';
import { updateOneNotification } from '../../../utils/api/notifications';
interface Props {
  description: string;
  name: string;
  profileImg: string;
  todoUrl: string;
  seen: boolean,
  id: string,
  createdAt: Date, 
}

export default function NotificationCardContainer({
  description,
  name,
  profileImg,
  todoUrl,
  seen,
  id,
  createdAt,
}: Props): ReactElement {


  return (
    <NotificationCard
      name={name}
      createdAt={createdAt}
      description={description}
      profileImg={profileImg}
      todoUrl={todoUrl}
    />
  );
}
