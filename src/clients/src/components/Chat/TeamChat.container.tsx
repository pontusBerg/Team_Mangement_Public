import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import TeamMessageList from './TeamMessageList';
import { Message } from '../../types/message';
import './chat.styles.scss';
import Container from '../Shared/Container/Container';
import { Event } from '../../types/event';
import { postOneMessage } from '../../utils/api/messages';
import WriteMessageToolbar from './WriteMessageToolbar';
import {
  startFetchMessages,
  incrementSkip,
  removeChatMessages,
  addMessage,
} from '../../redux/team-chat/team-chat.actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import { startAddMessage } from '../../redux/dashboard-chat/dashboard-chat.types';
import FailedFetch from '../Shared/FailedFetch/FailedFetch';
interface Props {
  messages: Message[];
  id: string;
  startFetchMessages: () => void;
  incrementSkip: () => void;
  skip: number;
  currentScroll: number;
  removeChatMessages: () => void;
  addMessage: (message: Message) => void;
  loading: boolean;
  addDashboardMessage: (message: Message) => void;
  error: boolean;
  socket: any; 
}


function TeamChatContainer({
  addDashboardMessage,
  removeChatMessages,
  messages,
  id,
  startFetchMessages,
  incrementSkip,
  skip,
  addMessage,
  loading,
  error,
  socket,
}: Props): ReactElement {
  const [message, setMessage] = useState('');
  const didMount = useRef(true);

  useEffect(() => {
    startFetchMessages();
  }, []);

  useEffect(() => {
    socket.on('message', (newMessage: any) => {
      if (newMessage) {
        addMessage(newMessage);
        addDashboardMessage(newMessage);
      }
    });
  }, []);

  const handleOnMessageChange = (event: Event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmitClick = () => {
    return message.length === 0 ? null : saveMessage();
  };

  const saveMessage = () => {
    postOneMessage(message)
      .then((response) => {
        socket.emit('sendTeamMessage', response.data);
        setMessage(''); 
      })
      .catch((error) => {
        return;
      });
  };

  const handleOnTopClick = () => {
    incrementSkip();
    startFetchMessages();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <FailedFetch text="Could not get messages" onClick={startFetchMessages} />
    );
  }

  return (
    <div className="team-chat-page">
      <Container>
        <TeamMessageList
          onTopClick={handleOnTopClick}
          userId={id}
          messages={messages}
        />
      </Container>
      <WriteMessageToolbar
        messageValue={message}
        onSendClick={handleMessageSubmitClick}
        onChange={(event) => handleOnMessageChange(event)}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  messages: state.teamMessagesInfo.messages,
  id: state.userInfo.user.id,
  skip: state.teamMessagesInfo.skip,
  currentScroll: state.teamMessagesInfo.currentScroll,
  loading: state.teamMessagesInfo.messagesLoading,
  error: state.teamMessagesInfo.messageError,
});

const mapDispatchToProps = (dispatch: any) => ({
  startFetchMessages: () => dispatch(startFetchMessages()),
  incrementSkip: () => dispatch(incrementSkip()),
  removeChatMessages: () => dispatch(removeChatMessages()),
  addMessage: (message: Message) => dispatch(addMessage(message)),
  addDashboardMessage: (message: Message) => dispatch(startAddMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamChatContainer);
