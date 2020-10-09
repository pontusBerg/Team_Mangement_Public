import React, { ReactElement, useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import FailedFetch from '../Shared/FailedFetch/FailedFetch';
import TodoCardSkeleton from './TodoCard.skeleton';
import TodosList from './TodosList';
import { connect } from 'react-redux';
import {
  startSortTodos,
  startFilterTodos,
  setSort,
  setFilter,
  startFetchTodos,
  setSearch,
  startSearchTodo,
} from '../../redux/team-todos/team-todos.actions';
import { TodoAndUser } from '../../types/todo';
import './dashboard.scss';
import TeamFilterOptionsContainer from './TeamFilterOptions.container';
interface Props {
  loading: boolean;
  error: boolean;
  todos: TodoAndUser[];
  startFetchTodos: () => void;
  filter: string;
  sort: string;
  sortUrgencyDsc: () => void;
  sortDifficultyDsc: () => void;
  search: string;
  setSearch: (value: string) => void;
  startSearchTodo: () => void; 
}

function TeamDashboardContainer({
  loading,
  error,
  todos,
  startFetchTodos,
  sort,
  filter,
  sortUrgencyDsc,
  sortDifficultyDsc,
  startSearchTodo,
  setSearch,
  search,
}: Props): ReactElement {
  const firstRender = useRef(true);

  useEffect(() => {
    startFetchTodos();
  }, []);

  useEffect(() => {
    if(!firstRender.current) startSearchTodo();
  }, [search]);

  useEffect(() => {
    if (!firstRender.current) {
    }
  }, [sort]);

  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
    }

  }, []);

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleRetryClick = () => {
    startFetchTodos();
  };

  return (
    <div className="dashboard-page">
      <SearchBar
        placeholder="Search Team Todos"
        onChange={(value) => onSearchChange(value)}
        value={search}
      />
      <TeamFilterOptionsContainer />
      {error && (
        <FailedFetch text="Could not get todos" onClick={handleRetryClick} />
      )}
      {todos.length === 0 && !error && !loading && (
        <div>Your team currently have no unassigned {filter} todos.</div>
      )}
      {loading ? <TodoCardSkeleton /> : <TodosList todos={todos} />}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.teamTodoInfo.loading,
  search: state.teamTodoInfo.search,
  error: state.teamTodoInfo.error,
  todos: state.teamTodoInfo.todos,
  filter: state.teamTodoInfo.filter,
  sort: state.teamTodoInfo.sort,
});

const mapDispatchToProps = (dispatch: any) => ({
  startFetchTodos: () => dispatch(startFetchTodos()),
  setFilter: (filter: string) => dispatch(setFilter(filter)),
  setSort: (sort: string) => dispatch(setSort(sort)),
  sortTodos: () => dispatch(startSortTodos()),
  filterTodos: () => dispatch(startFilterTodos()),
  setSearch: (search: string) => dispatch(setSearch(search)),
  startSearchTodo: () => dispatch(startSearchTodo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamDashboardContainer);
