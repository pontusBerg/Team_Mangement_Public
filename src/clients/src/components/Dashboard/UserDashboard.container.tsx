import React, { ReactElement, useEffect, useRef, Dispatch } from 'react';
import { connect } from 'react-redux';
import {
  startFetchTodos,
  setSort,
  setSearch,
  startSearchTodo,
  startSortTodos,
  setFilter,
  clearState,
} from '../../redux/user-todos/user-todo.actions';
import { Todo, TodoAndUser } from '../../types/todo';
import Container from '../Shared/Container/Container';
import TodosList from './TodosList';
import TodoCardSkeleton from './TodoCard.skeleton';
import FailedFetch from '../Shared/FailedFetch/FailedFetch';
import FilterOption from './FilterOption';
import FilterOptions from './FilterOptions';
import SearchBar from './SearchBar';
import { Event } from '../../types/event';
import './dashboard.scss';
import UserFilterOptionsContainer from './UserFilterOptions.container';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';

interface Props {
  startFetchTodos: () => void;
  id: string;
  todos: TodoAndUser[];
  error: boolean;
  loading: boolean;
  filter: string,
  sort: string;
  search: string;
  name: string;
  profileImg: string;
  setSort: (value: string) => void;
  setSearch: (search: string) => void;
  startSearchTodo: () => void;
  sortTodos: () => void;
  startSortTodos: () => void;
  clearTodos: () => void;  
}

function UserDashboardContainer({
  startFetchTodos,
  id,
  todos,
  error,
  name,
  profileImg,
  loading,
  sort,
  search,
  filter,
  setSort,
  setSearch,
  startSearchTodo,
  sortTodos,
  startSortTodos,
  clearTodos
}: Props): ReactElement {

  const initRender = useRef(true);


  useEffect(() => {
      startSearchTodo();
      return () => {
        clearTodos()
      }
  }, []);

  useEffect(() => {
   if(!initRender.current) { startSearchTodo() }
  }, [search])
  
  useEffect(() => {
    if(initRender.current) {
      initRender.current = false 
    }
  }, [])
  
  
  const handleRetryClick = () => {
    startFetchTodos();
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };




  return (

        <div className="dashboard-page">
          <SearchBar
            onChange={(value) => onSearchChange(value)}
            value={search}
            placeholder="Search User Todos"
          />
          <UserFilterOptionsContainer />
          {error && (
            <FailedFetch
              text="Could not get todos"
              onClick={handleRetryClick}
            />
          )}
          {(todos.length === 0 && !error && !loading) && (
            <div>
              You currently have no active {filter} todos. 
            </div>
          )}
          {loading ? <LoadingSpinner /> : <TodosList todos={todos} />}
        </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  startFetchTodos: () => dispatch(startFetchTodos()),
  setSort: (sort: string) => dispatch(setSort(sort)),
  setFilter: (filter: string) => dispatch(setFilter(filter)),
  setSearch: (search: string) => dispatch(setSearch(search)),
  startSearchTodo: () => dispatch(startSearchTodo()),
  startSortTodos: () => dispatch(startSortTodos()),
  clearTodos: () => dispatch(clearState())
});

const mapStateToProps = (state: any) => ({
  loading: state.userTodoInfo.loading,
  error: state.userTodoInfo.error,
  todos: state.userTodoInfo.todos,
  sort: state.userTodoInfo.sort,
  search: state.userTodoInfo.search,
  filter: state.userTodoInfo.filter,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboardContainer);
