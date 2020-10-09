import axios from 'axios';
import { Todo } from './user-todo.types';

export const fetchTodosLoading = () => ({
  type: 'TODOS_REQUEST_LOADING',
});

export const fetchTodosFailed = () => ({
  type: 'TODOS_REQUEST_FAILED',
});

export const fetchTodosSuccess = (todos: Todo) => ({
  type: 'TODOS_REQUEST_SUCCESS',
  todos,
});

export const filterTodos = (todos: Todo) => ({
  type: 'FILTER_TODOS',
  todos,
});

export const searchTodos = (todos: Todo) => ({
  type: 'SEARCH_TODOS',
  todos,
});

export const sortTodosAsc = () => ({
  type: 'SORT_TODOS_ASC',
});

export const sortTodosCreatedAtNewest = () => ({
  type: 'SORT_TODOS_CREATED_AT_NEWEST',
});

export const sortTodosCreatedAtOldest = () => ({
  type: 'SORT_TODOS_CREATED_AT_OLDEST',
});

export const setFilter = (filter: string) => ({
  type: 'SET_FILTER',
  filter,
});

export const setSort = (sort: string) => ({
  type: 'SET_SORT',
  sort,
});

export const sortByUrgencyDsc = () => ({
  type: 'SORT_TODOS_URGENCY_DSC',
});

export const sortByDifficultyDsc = () => ({
  type: 'SORT_TODOS_DIFFICULTY_DSC',
});

export const setSearch = (search: string) => ({
  type: 'SET_SEARCH',
  search,
});

export const clearState = () => ({
  type: 'CLEAR_STATE',
});

export const startSortTodos = () => {
  return (dispatch: any, getState: any) => {
    const sortValue = getState().userTodoInfo.sort;
    if (sortValue === 'oldest') {
      return dispatch(sortTodosCreatedAtOldest());
    }
    if (sortValue === 'newest') {
      return dispatch(sortTodosCreatedAtNewest());
    }
    if (sortValue === 'urgency') {
      return dispatch(sortByUrgencyDsc());
    }
    if (sortValue === 'difficulty') {
      return dispatch(sortByDifficultyDsc());
    }
  };
};

export const startSearchTodo = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(fetchTodosLoading());
    try {
      const response = await axios.get('/api/todos/user');
      return getState().userTodoInfo.search.length === 0
        ? dispatch(fetchTodosSuccess(response.data))
        : dispatch(searchTodos(response.data));
    } catch (error) {
      dispatch(fetchTodosFailed());
    }
  };
};

export const startFilterTodos = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(fetchTodosLoading());
    try {
      const response = await axios.get('/api/todos/user');
      return getState().userTodoInfo.filter === 'All'
        ? dispatch(fetchTodosSuccess(response.data))
        : dispatch(filterTodos(response.data));
    } catch (error) {
      dispatch(fetchTodosFailed());
    }
  };
};

export const startFetchTodos = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(fetchTodosLoading());

    try {
      const response = await axios.get('/api/todos/user');
      dispatch(fetchTodosSuccess(response.data));
    } catch (error) {
      dispatch(fetchTodosFailed());
    }
  };
};
