import React, { ReactElement, useState, useEffect } from 'react';
import InputIcon from '../Shared/InputIcon/InputIcon';
import Input from '../Shared/input/Input';
import Layout from '../Shared/Layout/Layout';
import Container from '../Shared/Container/Container';
import Modal from '../Shared/modal/Modal';
import { useWindowWidth } from '@react-hook/window-size';
import DropdownSelect from './DropdownSelect';
import { fetchAllUsers } from '../../utils/api/users';
import { User } from '../../types/user';
import Button from '../Shared/Button/Button';
import { NonSavedTodo } from '../../types/todo';
import { postOneTodo, deleteOneTodo } from '../../utils/api/todos';
import { connect } from 'react-redux';
import { AiOutlineCheck, AiOutlineExclamation } from 'react-icons/ai';
import './create-todo.style.scss';
import InputLabel from '../Shared/InputLabel/InputLabel';
import Textarea from '../Shared/Textarea/Textarea';
import { postOneTimeline } from '../../utils/api/timeline';
import { postOneNotification } from '../../utils/api/notifications';
interface Props {
  team: string;
  userId: string;
  socket: any
  match: {
    params: {
      id: string;
    };
  };
}



function CreateTodoContainer({ team, match, userId, socket }: Props): ReactElement {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([{ name: 'Unassigned', value: '' }]);
  const [selectedUser, setSelectedUser] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [urgency, setUrgency] = useState('1');
  const [category, setCategory] = useState('Front End');
  const [toggleSuccessModal, setToggleSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleErrorModal, setToggleErrorModal] = useState(false);
  const width = useWindowWidth();

  interface UnassignedUser {
    name: string;
    value: null;
  }

  useEffect(() => {
    
  }, [])


  
  useEffect(() => {
    fetchAllUsers()
      .then((res) => handleUserFetchSuccess(res.data))
      .catch((error) => {
        return;
      });
  }, []);

  const handleUserFetchSuccess = (response: any) => {
    // DropdownSelect expects name and value as a props so we modify the response array to correlate with props.
    const userValues = response.map((user: any) => {
      return { name: user.name, value: user._id };
    });

    setUsers([...users, ...userValues]);
  };

  const handleOnSaveClick = () => {
    const todoInfo = {
      title,
      description,
      user: selectedUser,
      difficulty,
      urgency,
      category,
      team,
    };

    // Remove user property if no user is selected.
    if (todoInfo.user.length === 0) {
      delete todoInfo.user;
    }

    createTodo(todoInfo);
  };


  const createTodo = async (todo: NonSavedTodo) => {
    try {
      const response = await postOneTodo(todo);
      await postOneTimeline('create', response.data._id);

      // Only create a notification if user has created a todo for someone else. 
      if (response.data.user !== null && response.data.user !== userId) {
        await postOneNotification('create', response.data);
        socket.emit('createTodo', response.data);
      }


      handleSaveSuccess()
    } catch (error) {
      console.log(error)
      handleSaveError('Could not create todo');
    }
  };

  const handleSaveError = (error: any) => {
    setErrorMessage(error);
    setToggleErrorModal(true);
    setTimeout(() => {
      setToggleErrorModal(false);
    }, 3000);
  };

  const handleSaveSuccess = () => {
    setToggleSuccessModal(true);
    setTitle('');
    setDescription('');
    setTimeout(() => {
      setToggleSuccessModal(false);
    }, 3000);
  };

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
    <div className="create-todo-page">
        <InputLabel
          value={title}
          label={'Title'}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Textarea
          label={'Description'}
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <div className="create-todo-dropdown-group">
          <DropdownSelect
            onChange={(event) => setDifficulty(event.target.value)}
            label="Difficulty"
            values={numberValues}
          />
          <DropdownSelect
            onChange={(event) => setUrgency(event.target.value)}
            label="Urgency"
            values={numberValues}
          />
        </div>
        <div className="create-todo-dropdown-group">
          <DropdownSelect
            onChange={(event) => setCategory(event.target.value)}
            label="Category"
            values={todoCategories}
          />
          <DropdownSelect
            onChange={(event) => setSelectedUser(event.target.value)}
            label="User"
            values={users}
          />
        </div>
        <Button onClick={handleOnSaveClick} text="Save" />
        {toggleSuccessModal && (
          <Modal
            icon={<AiOutlineCheck />}
            title="Yay!"
            text="You created a new todo!"
          />
        )}
        {toggleErrorModal && (
          <Modal
            iconBackground="#EF5B5B"
            icon={<AiOutlineExclamation />}
            title="Oops!"
            text={errorMessage}
          />
        )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  team: state.userInfo.user.team,
  userId: state.userInfo.user.id,
});

export default connect(mapStateToProps)(CreateTodoContainer);
