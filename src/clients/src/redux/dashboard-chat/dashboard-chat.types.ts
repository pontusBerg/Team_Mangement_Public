import axios from 'axios';
import { Message } from '../../types/message';


export const dashboardMessageRequestLoading = () => ({
  type: 'DASHBOARD_MESSAGE_REQUEST_LOADING',
});

export const dashboardMessageRequestFailed = () => ({
  type: 'DASHBOARD_MESSAGE_REQUEST_FAILED',
});

export const dashboardMessageRequestSuccess = (messages: Message) => ({
  type: 'DASHBOARD_MESSAGE_REQUEST_SUCCESS',
  messages,
});

export const addMessage = (message: Message) => ({
  type: 'ADD_MESSAGE',
  message
})

export const addMessageAndRemoveOldest = (message: Message) => ({
  type: "ADD_MESSAGE_AND_REMOVE_OLDEST",
  message
})

export const startAddMessage = (message: Message) => {
  return (dispatch:any, getState: any) => {
    const numberOfMessages = getState().dashboardMessagesInfo.messages.length

    if(numberOfMessages >= 15) {
      dispatch(addMessageAndRemoveOldest(message))
    } else {
      dispatch(addMessage(message))
    }
  }
}

export const dashboardStartFetchMessages = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(dashboardMessageRequestLoading());
    try { 
      const response = await axios.get('/api/messages', {
        params: {
          limit: 15,
          skip: 0,
        },
        
      });
      response.data.reverse()
      dispatch(dashboardMessageRequestSuccess(response.data));


    } catch (error) {
      dispatch(dashboardMessageRequestFailed());
    }
  };
};
