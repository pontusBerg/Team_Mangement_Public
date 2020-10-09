import React, { ReactElement } from 'react';
import { Event } from '../../types/event';
import './dropdown.style.scss';
interface Props {
  values: Values[];
  label: string;
  onChange: (event: Event) => void;
  defaultValue?: string | number;
}

interface Values {
  name: string;
  value: string;
}

export default function DropdownSelect({
  values,
  label,
  onChange,
  defaultValue,
}: Props): ReactElement {
  return (
    <div className="dropdown-select-wrap">
      <label htmlFor="">{label}</label>
      <select
        className="dropdown-select"
        onChange={(event) => onChange(event)}
        name=""
      >
        {values.map(({ name, value }) => {  

          return (
            <option
              key={value}
              selected={defaultValue === value}
              style={{
                marginBottom: '10px',
                fontSize: '16px',
                padding: '20px 20px',
              }}
              value={value}
            >
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
