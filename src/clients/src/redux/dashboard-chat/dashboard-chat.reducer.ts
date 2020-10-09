const DEFAULT_STATE = {
  messages: [],
  messagesLoading: true,
  messagesError: false,
  limit: 15,
  skip: 0,
};

export default (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case 'DASHBOARD_GET_USER_MESSAGES':
      return { ...state };

    case 'DASHBOARD_MESSAGE_REQUEST_LOADING':
      return { ...state, messagesLoading: true };

    case 'DASHBOARD_MESSAGE_REQUEST_SUCCESS':
      return {
        ...state,
        messages: [...action.messages],
        messagesError: false,
        messagesLoading: false,
      };

    case 'ADD_MESSAGE_AND_REMOVE_OLDEST': 
    return {
      ...state,
      messages: [...state.messages.slice(1), action.message]
    }
    case 'ADD_MESSAGE': 
    return {
      ...state, 
    messages: [...state.messages, action.message]
    }
    default:
      return { ...state };
  }
};
