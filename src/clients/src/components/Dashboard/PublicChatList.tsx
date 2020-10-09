import React, { ReactElement, useRef, useEffect } from 'react';
import PublicChatMessage from './PublicChatMessage';
import { Message } from '../../types/message';
import { profile } from 'console';
import './chat-message.style.scss';
import { scrollToBottom } from '../../utils/scroll/scrollToBottom';
import { filterTodos } from '../../redux/user-todos/user-todo.actions';
interface Props {
  messages: Message[];
}

export default function PublicChatList({ messages }: Props): ReactElement {
  const listRef = useRef(null);

  useEffect(() => {
    scrollToBottom(listRef);
  }, []);

  const trimMessage = (message: string) => {
    if (message.length > 50) {
      console.log(message.slice(0, 50), 'Skitan');
      const trimmedMessage = `${message.slice(0, 100)}...`;
      return trimmedMessage;
    } else {
      return message;
    }
  };
  
  return (
    <div ref={listRef} className="public-chat-list">
      {messages.map(({_id, message, createdAt, user: { name, profileImg } }) => {
        return (
          <PublicChatMessage
            key={_id}
            message={trimMessage(message)}
            createdAt={createdAt}
            name={name}
            profileImg={profileImg}
          />
        );
      })}
    </div>
  );
}
