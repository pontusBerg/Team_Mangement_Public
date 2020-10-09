import React, { ReactElement, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Message } from '../../types/message';
import PublicChatList from './PublicChatList';
import PublicChatMessageSkeleton from './PublicChatMessage.skeleton';
import { dashboardStartFetchMessages } from '../../redux/dashboard-chat/dashboard-chat.types';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import FailedFetch from '../Shared/FailedFetch/FailedFetch';
interface Props {
  messages: Message[];
  dashboardStartFetchMessages: () => void;
  loading: boolean,
  error: boolean,
}

function PublicChatContainer({
  messages,
  dashboardStartFetchMessages,
  loading,
  error
}: Props): ReactElement {


  useEffect(() => {
    dashboardStartFetchMessages();
  }, []);




  if(loading) {
    return (
      <div className="public-chat-list">
        <LoadingSpinner />
      </div>
    )
  }

  if(error) {
    return (
      <div className="public-chat-list">
        <FailedFetch text="Could not get messages" onClick={() => dashboardStartFetchMessages()} />
      </div>
    )
  }
 
  return (
    <div className="public-chat-container">
    <PublicChatList messages={messages} />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  messages: state.dashboardMessagesInfo.messages,
  error: state.dashboardMessagesInfo.messagesError,
  loading: state.dashboardMessagesInfo.messagesLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  dashboardStartFetchMessages: () => dispatch(dashboardStartFetchMessages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicChatContainer);
