import axios from 'axios';
import { NonSavedTodo, EditTodoInterface } from '../../types/todo';

export const postOneTodo = async (todoInfo: NonSavedTodo) => {
  const response = await axios.post('/api/todos', {
    todoInfo,
  });
  return response;
};

export const fetchOneTodoWithTimeline = async (id: string) => {
  const response = await axios.get(`/api/todos/${id}/timeline`);
  return response;
};

export const updateOneTodo = async (id: string, updates: object) => {
  const response = await axios.patch(`/api/todos/${id}`, {
    updates
  });
  return response;
};




export const deleteOneTodo = async (id: string) => {
  const response = await axios.delete(`/api/todos/${id}`)
}