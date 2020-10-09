import React, { ReactElement } from 'react';
import TodoCard from './TodoCard';
import { Todo, TodoAndUser } from '../../types/todo';
import TodoCardSkeleton from './TodoCard.skeleton';
import { connect } from 'react-redux';
import TodoCardContainer from './TodoCard.container';

interface Props {
  todos: TodoAndUser[];
  id: string;
}

function TodosList({ todos, id }: Props): ReactElement {
  let userName: string;

  return (
    <div className="todos-list">
      {todos.map((todo) => {
        if (todo.user === null) {
          userName = 'None';
        } else if (todo.user._id === id) {
          userName = 'You';
        } else {
          userName = todo.user.name;
        }

        return (
          <TodoCardContainer
            id={todo._id}
            title={todo.title}
            urgency={todo.urgency}
            difficulty={todo.difficulty}
            user={userName}
            createdAt={todo.createdAt}
            updatedAt={todo.updatedAt}
            category={todo.category}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  id: state.userInfo.user.id,
});

export default connect(mapStateToProps)(TodosList);
