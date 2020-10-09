const DEFAULT_STATE = {
  notifications: [],
  notificationsError: false,
  notificationsLoading: false,
};

export default (state = DEFAULT_STATE, action: any) => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return { ...state };

    case 'NOTIFICATION_REQUEST_LOADING':
      return {
        ...state,
        notificationsError: false,
        notificationsLoading: true,
      };

    case 'NOTIFICATION_REQUEST_FAILED':
      return {
        ...state,
        notificationsError: true,
        notificationsLoading: false,
      };

    case 'NOTIFICATION_REQUEST_SUCCESS':

      return {
        ...state,
        notifications: [...action.notifications],
        notificationsError: false,
        notificationsLoading: false,
      };

    default:
      return { ...state };
  }
};
