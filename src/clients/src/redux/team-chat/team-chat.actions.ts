import axios from 'axios';
import { Message } from '../../types/message';

export const getMessages = () => ({
  type: 'GET_MESSAGES',
});

export const messageRequestLoading = () => ({
  type: 'MESSAGE_REQUEST_LOADING',
});

export const messageRequestFailed = () => ({
  type: 'MESSAGE_REQUEST_FAILED',
});

export const messageRequestSuccess = (messages: Message[]) => ({
  type: 'MESSAGE_REQUEST_SUCCESS',
  messages,
});


export const removeChatMessages = () => ({
  type: "REMOVE_CHAT_MESSAGES"
})

export const addMessage = (message: Message) => ({
  type: "ADD_ONE_MESSAGE",
  message
})

export const incrementSkip = () => ({
  type: 'INCREMENT_SKIP'
})

export const changeScrollPosition = (position: number | null) => ({
  type: "CHANGE_SCROLL_POSITION",
  payload: position 
})

export const allMessagesSeen = () => ({
  type: "ALL_MESSAGES_SEEN"
})

export const stopLoading = () => ({
  type: "STOP_LOADING"
})

export const startFetchMessages = () => {
  return async (dispatch: any, getState: any) => {
    if(getState().teamMessagesInfo.skip === 0) {
      dispatch(messageRequestLoading());
    }
    try {
      const {skip, limit} = getState().teamMessagesInfo;
      const response = await axios.get('/api/messages', {
        params: {
          skip,
          limit,
        },
        
      });

      response.data.reverse()
      return response.data.length === 0 && getState().teamMessagesInfo.skip > 0 ?
      dispatch(allMessagesSeen())
      :
      dispatch(messageRequestSuccess(response.data))
    } catch (error) {
      dispatch(messageRequestFailed());
    }
  };
};
