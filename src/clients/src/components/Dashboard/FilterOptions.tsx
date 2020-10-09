import React, { ReactElement, useState, useEffect, useRef, ChangeEvent } from 'react';
import FilterOption from './FilterOption';



interface Props {
  sort: string,
  filter: string;
  onChangeSortClick: (value: string) => void;
  onChangeFilterClick: (value: string) => void;
}

export default function FilterOptions({
  sort,
  filter,
  onChangeFilterClick,
  onChangeSortClick
}: Props): ReactElement {


  return (
    <div className="filter-options">
      <div className="filter-options-section">
        <FilterOption
          background="#2F344C"
          currentValue={filter}
          groupName="filter_options"
          name="All"
          value="All"
          onClick={(event) => onChangeFilterClick(event.target.value)}
          key="all"
        />
        <FilterOption
          background="#2F344C"
          currentValue={filter}
          groupName="filter_options"
          name="Front End"
          value="Front End"
          onClick={(event) => onChangeFilterClick(event.target.value)}
          key="frontend"
        />
        <FilterOption
          background="#2F344C"
          currentValue={filter}
          groupName="filter_options"
          name="Back End"
          value="Back End"
          onClick={(event) => onChangeFilterClick(event.target.value)}
          key="backend"
        />
        <FilterOption
          background="#2F344C"
          currentValue={filter}
          groupName="filter_options"
          name="UI"
          value="UI"
          onClick={(event) => onChangeFilterClick(event.target.value)}
          key="ui"
        />
        <FilterOption
          background="#2F344C"
          currentValue={filter}
          groupName="filter_options"
          name="UX"
          value="UX"
          onClick={(event) => onChangeFilterClick(event.target.value)}
          key="ux"
        />
      </div>
      <div className="filter-options-section">
        <FilterOption
          background="#648CF6"
          currentValue={sort}
          groupName="sort_options"
          name="Urgency"
          value="urgency"
          onClick={(event) => onChangeSortClick(event.target.value)}
        />
        <FilterOption
          background="#648CF6"
          currentValue={sort}
          groupName="sort_options"
          name="Difficulty"
          value="difficulty"
          onClick={(event) => onChangeSortClick(event.target.value)}
        />
        <FilterOption
          background="#648CF6"
          currentValue={sort}
          groupName="sort_options"
          name="Newest"
          value="newest"
          onClick={(event) => onChangeSortClick(event.target.value)}
        />
        <FilterOption
          background="#648CF6"
          currentValue={sort}
          groupName="sort_options"
          name="Oldest"
          value="oldest"
          onClick={(event) => onChangeSortClick(event.target.value)}
        />
      </div>
    </div>
  );
}