import React, { ReactElement, useState } from 'react'
import TodoCard from './TodoCard'

interface Props {
  title: string,
  urgency: string;
  difficulty: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  category: string;
}

export default function TodoCardContainer({category, title, createdAt, updatedAt, urgency, difficulty, id, user}: Props): ReactElement {

  const [togglePopup, setTogglePopup] = useState(false)

  const handleOnMouseEnter = () => {
    setTogglePopup(true)
  }

  const handleOnMouseLeave = () => {
    setTogglePopup(false)
  }



  return (
    <div className="todo-card">
      <TodoCard category={category} triggerPopup={togglePopup} onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter} title={title} createdAt={createdAt} updatedAt={updatedAt} user={user} urgency={urgency} difficulty={difficulty} id={id} />
    </div>
  )
}
