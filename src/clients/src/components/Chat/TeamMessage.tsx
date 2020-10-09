import React, { ReactElement } from 'react';
import ChatBubble from './ChatBubble';
import ChatProfileImg from './ChatProfileImg';

interface Props {
  createdAt: Date;
  message: string;
  userId: string;
  id: string;
  profileImg: string;
}

export default function TeamMessage({
  createdAt,
  message,
  userId,
  id,
  profileImg,
}: Props): ReactElement {
  const marginStyle = () => {
    // Check if message was made by user
    return userId === id
      ? { display: 'Flex', justifyContent: 'flex-end' }
      : { marginLeft: 0 };
  };

  return (
    <div style={marginStyle()} className="team-message-wrap">
      <div className="team-message">
        <ChatBubble
          createdAt={createdAt}
          message={message}
          currentUserMessage={userId === id ? true : false}
        />
        <ChatProfileImg sizeInPixels={'40px'} img={profileImg} />
      </div>
    </div>
  );
}
