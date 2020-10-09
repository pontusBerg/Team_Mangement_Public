import React, { ReactElement } from 'react';
import './filter-option.scss';
interface Props {
  value: string;
  name: string;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  groupName: string;
  currentValue?: string;
  background: string,
}

export default function FilterOption({
  value,
  name,
  onClick,
  groupName,
  currentValue,
  background
}: Props): ReactElement {
  return (
    <div
      style={
        currentValue === value
          ? { background, color: 'white' }
          : { background: 'white' }
      }
      className="filter-option"
    >
      <label htmlFor="">{name}</label>
      <input
        name={groupName}
        onChange={(event) => onClick(event)}
        value={value}
        type="radio"
      />
    </div>
  );
}
