import axios from 'axios';


export const getNotifications = () => ({
  type: 'GET_NOTIFICATIONS'
})

export const notificationsRequestLoading = () => ({
 type: 'NOTIFICATION_REQUEST_LOADING' 
})

export const notificationRequestError = () => ({
  type: 'NOTIFICATION_REQUEST_ERROR'
})

export const notificationRequestSuccess = (notifications: Notification[]) => ({
  type: 'NOTIFICATION_REQUEST_SUCCESS',
  notifications
})

export const startFetchNotifications = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(notificationsRequestLoading())
    try {
      const response = await axios.get('/api/notifications')
      if(response.data.length === 0) {
        return 
      }
      console.log(response)
      dispatch(notificationRequestSuccess(response.data))
    } catch (error) {
      dispatch(notificationRequestError())
    }
  }
}