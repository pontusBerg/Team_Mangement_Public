import React, { ReactElement, useState, useEffect } from 'react';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import { FaCog } from 'react-icons/fa';
import IconHover from '../Shared/IconHover/IconHover';
import Button from '../Shared/Button/Button';
import { Todo, TodoAndUser } from '../../types/todo';
import {SelectOption} from '../../types/form'
import Input from '../Shared/input/Input';
import InputLabel from '../Shared/InputLabel/InputLabel';
import DropdownSelect from '../CreateTodo/DropdownSelect';
import './edit-todo.style.scss'
import {EditTodoInterface} from '../../types/todo'
interface Props {
  onOutsideClick: () => void;
  onSaveClick: (changes: EditTodoInterface) => void;
  todo: TodoAndUser;
  users: SelectOption[];
  onCloseModalClick: () => void;
}

interface Values {
  name: string;
  value: string;
}


export default function EditTodo({
  todo,
  onSaveClick,
  users,
  onOutsideClick,
  onCloseModalClick
}: Props): ReactElement {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(todo.category);
  const [urgency, setUrgency] = useState(todo.urgency);
  const [difficulty, setDifficulty] = useState(todo.difficulty);

  const numberValues = [
    {
      value: '1',
      name: '1',
    },
    {
      value: '2',
      name: '2',
    },
    {
      value: '3',
      name: '3',
    },
    {
      value: '4',
      name: '4',
    },
    {
      value: '5',
      name: '5',
    },
    {
      value: '6',
      name: '6',
    },
    {
      value: '7',
      name: '7',
    },
    {
      value: '8',
      name: '8',
    },
    {
      value: '9',
      name: '9',
    },
    {
      value: '10',
      name: '10',
    },
  ];
  const todoCategories = [
    {
      value: 'Front End',
      name: 'Front End',
    },
    {
      value: 'Back End',
      name: 'Back End',
    },
    {
      value: 'UI',
      name: 'UI',
    },
    {
      value: 'UX',
      name: 'UX',
    },
  ];



  return (
    <FullscreenModal onCloseModalClick={onCloseModalClick} onOutsideClick={onOutsideClick}>
      <div className="todo-edit">
        <InputLabel
          label="Title"
          placeholder={todo.title}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <InputLabel
          label="Description"
          value={description}
          placeholder={todo.description}
          onChange={(event) => setDescription(event.target.value)}

        />
        <div className="todo-edit-section">
          <DropdownSelect
            onChange={(event) => setSelectedUser(event.target.value)}
            label="User"
            values={users}
            defaultValue={todo.user === null ? "null" : todo.user._id}
          />
          <DropdownSelect
            onChange={(event) => setSelectedCategory(event.target.value)}
            label="Category"
            values={todoCategories}
            defaultValue={todo.category}
          />
        </div>
        <div className="todo-edit-section">
          <DropdownSelect
            onChange={(event) => setUrgency(event.target.value)}
            label="Urgency"
            values={numberValues}
            defaultValue={todo.urgency.toString()}
          />
          <DropdownSelect
            onChange={(event) => setDifficulty(event.target.value)}
            label="Difficulty"
            values={numberValues}
            defaultValue={todo.difficulty.toString()}
          />
        </div>
        <Button onClick={() => onSaveClick({title, description, urgency, selectedCategory, difficulty, selectedUser})} text="Save" />
    </div>
      </FullscreenModal>
  );
}
