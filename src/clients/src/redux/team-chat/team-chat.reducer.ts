const DEFAULT_STATE = {
  messages: [],
  messagesLoading: false,
  messagesError: false,
  skip: 0,
  limit: 15,
  numberOfResponses: 0,
  allMessagesSeen: false, 
};

export default (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case 'GET_USER_MESSAGES':
      return { ...state };

    case 'MESSAGE_REQUEST_LOADING':
      return { ...state, messagesLoading: true };

    case 'MESSAGE_REQUEST_SUCCESS':
      return {
        ...state,
        messages: [...action.messages, ...state.messages],
        messagesError: false,
        messagesLoading: false,
        numberOfResponses: action.messages.length
      };

    case "INCREMENT_SKIP": 
    return {
      ...state,
      skip: state.skip + 15,
    }


    case "ADD_ONE_MESSAGE": 
    return {
      ...state,
      skip: state.skip + 1, 
      numberOfResponses: 1,
      messages: [...state.messages, action.message]
    }


    case "ALL_MESSAGES_SEEN": 
    return {
      ...state, 
      allMessagesSeen: true,
      skip: state.skip
    }

    case "REMOVE_CHAT_MESSAGES":
      return {...DEFAULT_STATE}
    default:
      return { ...state };
  }
};
