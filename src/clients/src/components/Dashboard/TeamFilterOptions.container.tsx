import React, { ReactElement, useEffect, useRef } from 'react';
import FilterOptions from './FilterOptions';
import { connect } from 'react-redux';
import {
  startSortTodos,
  startFilterTodos,
  setSort,
  setFilter,
} from '../../redux/team-todos/team-todos.actions';

interface Props {
  sortTodos: () => void;
  filterTodos: () => void;
  filter: string;
  sort: string;
  setSort: (sort: string) => void;
  setFilter: (filter: string) => void;
}

function TeamFilterOptionsContainer({
  sortTodos,
  filterTodos,
  filter,
  sort,
  setSort,
  setFilter,
}: Props): ReactElement {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) sortTodos();
  }, [sort]);

  useEffect(() => {
    if (!firstRender.current) {
      filterTodos();
    }
  }, [filter]);

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
  }, []);

  const handleChangeFilterClick = (value: string) => {
    setFilter(value);
  };

  const handleChangeSortClick = (value: string) => {
    setSort(value);
  };

  return (
    <FilterOptions
      filter={filter}
      sort={sort}
      onChangeSortClick={(value) => handleChangeSortClick(value)}
      onChangeFilterClick={(value) => handleChangeFilterClick(value)}
    />
  );
}

const mapStateToProps = (state: any) => ({
  filter: state.teamTodoInfo.filter,
  sort: state.teamTodoInfo.sort,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilter: (filter: string) => dispatch(setFilter(filter)),
  setSort: (sort: string) => dispatch(setSort(sort)),
  sortTodos: () => dispatch(startSortTodos()),
  filterTodos: () => dispatch(startFilterTodos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamFilterOptionsContainer);
