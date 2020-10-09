import React, { ReactElement, useEffect, useState } from 'react';
import {
  fetchOneTodoWithTimeline,
  updateOneTodo,
  deleteOneTodo,
} from '../../utils/api/todos';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import { EditTodoInterface } from '../../types/todo';
import EditTodo from './EditTodo';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineRedo,
} from 'react-icons/ai';
import TodoInfo from './TodoInfo';
import { TodoAndUser } from '../../types/todo';
import { useWindowWidth } from '@react-hook/window-size';
import TimelineList from './TimelineList';
import './todo-info.style.scss';
import IconHover from '../Shared/IconHover/IconHover';
import { fetchAllUsers } from '../../utils/api/users';
import { User } from '../../types/user';
import { SelectOption } from '../../types/form';
import userPlaceholder from '../../media/placeholder-user.svg';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import ModalConfirm from '../Shared/ModalConfirm/ModalConfirm';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { postOneTimeline } from '../../utils/api/timeline';
import { setTimeout } from 'timers';
interface Props {
  userId: string;
  match: {
    params: {
      id: string;
    };
  };
}

function TodoInfoContainer({ match, userId }: Props): ReactElement {
  const [todo, setTodo] = useState<TodoAndUser>();
  const [timeline, setTimeline] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleEditPopup, setToggleEditPopup] = useState(false);
  const [toggleDeletePopup, setToggleDeletePopup] = useState(false);
  const [toggleCompletePopup, setToggleCompletePopup] = useState(false);
  const [toggleMarkAsActiveModal, setToggleMarkAsActivePopup] = useState(false);
  const [users, setUsers] = useState<SelectOption[]>();
  const width = useWindowWidth();

  const history = useHistory();

  useEffect(() => {
    getTodo();
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetchAllUsers();

      // Format user to fit the dropdown selection html form
      const formattedUsers = response.data.map(({ name, _id }: User) => {
        return { name, value: _id };
      });
      const users = [{ name: 'Unassigned', value: 'null' }, ...formattedUsers];
      setUsers(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOnMarkAsActive = async () => {
    setToggleMarkAsActivePopup(true);
  };

  const getTodo = async () => {
    const todoId = match.params.id;
    try {
      const response = await fetchOneTodoWithTimeline(todoId);
      setTodo(response.data.todo);
      setTimeline(response.data.timeline);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleOnTodoEditClick = () => {
    setToggleEditPopup(true);
  };

  const handleOnCloseClick = () => {
    setToggleEditPopup(false);
  };

  const handleOnConfirmDeleteClick = async () => {
    try {
      const response = await deleteOneTodo(match.params.id);
      history.push('/dashboard/user');
    } catch (error) {}
  };

  const handleOnConfirmCompleteClick = async () => {
    try {
      await updateOneTodo(match.params.id, { completed: true });
      await postOneTimeline('complete', match.params.id);
      history.push('/dashboard/user');
    } catch (error) {
      handleError('Could not set todo as done');
    }
  };

  const handleError = (error: string) => {
    setError(true);
    setErrorMessage(error);
    setTimeout(() => {
      setError(false);
      setErrorMessage('');
    }, 3500);
  };

  const handleOnCompleteClick = () => {
    setToggleCompletePopup(true);
  };

  const handleOnDeleteClick = () => {
    setToggleDeletePopup(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Could not get todos</div>;
  }

  if (!todo || !users) {
    return <div></div>;
  }

  const handleOnConfirmActiveClick = async () => {
    try {
      await updateOneTodo(match.params.id, { completed: false });
      const response = await fetchOneTodoWithTimeline(match.params.id);
      setToggleMarkAsActivePopup(false);
      setTimeline(response.data.timeline);
      setTodo(response.data.todo);
    } catch (error) {
      handleError(`Could not set ${todo.title} as active again?`);
    }
  };

  const handleSaveClick = (changes: EditTodoInterface) => {
    const filteredChanges: any = {};

    if (changes.title.length > 0) {
      Object.assign(filteredChanges, { title: changes.title });
    }

    if (changes.description.length > 0) {
      Object.assign(filteredChanges, { description: changes.description });
    }

    if (changes.difficulty !== todo.difficulty) {
      Object.assign(filteredChanges, { difficulty: changes.difficulty });
    }

    if (changes.urgency !== todo.urgency) {
      Object.assign(filteredChanges, { urgency: changes.urgency });
    }

    if (changes.selectedUser.length > 0) {
      if (changes.selectedUser === 'null') {
        Object.assign(filteredChanges, { user: null });
      } else {
        Object.assign(filteredChanges, { user: changes.selectedUser });
      }
    }

    if (changes.selectedCategory !== todo.category) {
      Object.assign(filteredChanges, { category: changes.selectedCategory });
    }

    updateTodo(filteredChanges);
  };

  const updateTodo = async (changes: object) => {
    try {
      await updateOneTodo(todo._id, changes);
      await postOneTimeline('update', match.params.id, changes);
      const newTodo = await fetchOneTodoWithTimeline(match.params.id);
      setTimeline(newTodo.data.timeline);
      setTodo(newTodo.data.todo);
      setToggleEditPopup(false);
    } catch (error) {}
  };

  return (
    <div className="todo-info-page">
      {todo.user === null || todo.user._id === userId ? (
        <div className="todo-info-page-icons">
          {todo.completed ? (
            <IconHover
              icon={<AiOutlineRedo />}
              onClick={handleOnMarkAsActive}
            />
          ) : (
            <IconHover
              onClick={handleOnCompleteClick}
              icon={<AiOutlineCheck />}
            />
          )}
          <IconHover onClick={handleOnTodoEditClick} icon={<AiFillEdit />} />
          <IconHover onClick={handleOnDeleteClick} icon={<AiFillDelete />} />
        </div>
      ) : null}
      <div className="todo-info-bottom">
        {todo.user === null ? (
          <TodoInfo
            profileImg={userPlaceholder}
            selectedUser={'Unassigned'}
            title={todo.title}
            description={todo.description}
            urgency={todo.urgency}
            difficulty={todo.difficulty}
            category={todo.category}
          />
        ) : (
          <TodoInfo
            profileImg={todo.user.profileImg}
            selectedUser={todo.user.name}
            title={todo.title}
            description={todo.description}
            urgency={todo.urgency}
            difficulty={todo.difficulty}
            category={todo.category}
          />
        )}
        {width > 1025 && <TimelineList timelines={timeline} />}
        {toggleEditPopup && (
          <EditTodo
            users={users}
            todo={todo}
            onSaveClick={(changes) => handleSaveClick(changes)}
            onOutsideClick={handleOnCloseClick}
            onCloseModalClick={handleOnCloseClick}
          />
        )}
        {toggleDeletePopup && (
          <FullscreenModal
            onCloseModalClick={() => setToggleDeletePopup(false)}
            onOutsideClick={() => setToggleDeletePopup(false)}
          >
            <ModalConfirm
              text={`Are you sure you want to delete ${todo.title}`}
              onNoClick={() => setToggleDeletePopup(false)}
              onYesClick={handleOnConfirmDeleteClick}
            />
          </FullscreenModal>
        )}

        {toggleCompletePopup && (
          <FullscreenModal
            onCloseModalClick={() => setToggleCompletePopup(false)}
            onOutsideClick={() => setToggleCompletePopup(false)}
          >
            <ModalConfirm
              text={`Are you sure you want to mark ${todo.title} as complete`}
              onNoClick={() => setToggleCompletePopup(false)}
              onYesClick={handleOnConfirmCompleteClick}
            />
          </FullscreenModal>
        )}
        {toggleMarkAsActiveModal && (
          <FullscreenModal
            onCloseModalClick={() => setToggleCompletePopup(false)}
            onOutsideClick={() => setToggleCompletePopup(false)}
          >
            <ModalConfirm
              text={`Are you sure you want to mark ${todo.title} as active again`}
              onNoClick={() => setToggleMarkAsActivePopup(false)}
              onYesClick={handleOnConfirmActiveClick}
            />
          </FullscreenModal>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userId: state.userInfo.user.id,
});

export default connect(mapStateToProps)(TodoInfoContainer);
