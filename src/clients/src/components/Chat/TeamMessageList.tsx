import React, {
  ReactElement,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Message } from '../../types/message';
import TeamMessage from './TeamMessage';
import { connect } from 'react-redux';
import {
  changeScrollPosition,
} from '../../redux/team-chat/team-chat.actions';
import Button from '../Shared/Button/Button';
import { scrollToBottom } from '../../utils/scroll/scrollToBottom';


interface Props {
  messages: Message[];
  userId: string;
  onTopClick: () => void;
  allMessagesSeen: boolean;
  numberOfResponses: number;
  loading: boolean;
  skip: number;
  id: string; 
}

function TeamMessageList({
  numberOfResponses,
  messages,
  onTopClick,  
  allMessagesSeen,
  skip, 
  loading,
  id
}: Props): ReactElement {
  const listRef = useRef(null);
  const firstMount = useRef(true);

  const findUserScrollPosition = () => {

    // Ignore scroll hijacking when user recieves message from socket. 
    if(numberOfResponses === 1) {
      return
    }

    // @ts-ignore
    listRef.current.scrollTop = listRef.current.children[numberOfResponses -1].offsetTop
  };


  useEffect(() => {
   if(!firstMount.current) findUserScrollPosition();
  }, [messages]);

  useEffect(() => {
    if(!firstMount.current) {
      const lastMessage = messages[messages.length - 1]
      console.log(lastMessage)
    
      if(id === lastMessage.user._id && numberOfResponses === 1) {
        scrollToBottom(listRef)
      }

    }
  }, [messages])

  useEffect(() => {
   scrollToBottom(listRef)
  }, [])

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <div className="team-messages-list">
      <div ref={listRef} className="team-messages-message-list">
      <div className="team-messages-list-load-content">
        {allMessagesSeen ? (
          <div className="team-messages-list-seen">All messages seen</div>
        ) : (
          <Button
            className="btn-outline"
            text="Load more messages"
            onClick={event => {console.log(event); onTopClick()}}
          />
        )}
      </div>
        {messages.map(
          ({
            _id: messageId,
            message,
            createdAt,
            user: { name, profileImg, _id: userId },
          }) => {
            return (
              <TeamMessage
                key={messageId}
                message={message}
                createdAt={createdAt}
                profileImg={profileImg}
                userId={userId}
                id={id}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  listScrollPosition: state.teamMessagesInfo.listScrollPosition,
  allMessagesSeen: state.teamMessagesInfo.allMessagesSeen,
  numberOfResponses: state.teamMessagesInfo.numberOfResponses,
  loading: state.teamMessagesInfo.messagesLoading,
  skip: state.teamMessagesInfo.skip,
  id: state.userInfo.user.id
});

const mapDispatchToProps = (dispatch: any) => ({
  changeScrollPosition: (position: number | null) =>
    dispatch(changeScrollPosition(position)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMessageList);
