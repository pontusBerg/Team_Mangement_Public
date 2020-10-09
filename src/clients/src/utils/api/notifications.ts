import axios from 'axios';
import { TodoAndUser } from '../../types/todo';
export const postOneNotification = async (type: string, todo: TodoAndUser) => {
  const response = await axios.post('/api/notifications', {
    type,
    todo,
  });

  return response
};


export const updateOneNotification = async (id:string, updates: object) => {
  const response = await axios.patch(`/api/notifications/${id}` , {
    updates
  })

  return response
}