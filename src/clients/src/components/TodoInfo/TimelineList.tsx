import React, { ReactElement } from 'react'
import { timeline } from 'console'
import TodoTimeline from './TodoTimeline'
import './timeline.style.scss'
interface Props {
  timelines: []
}

export default function TimelineList({timelines}: Props): ReactElement {
  
  if(!timelines) {
    return <div>Loading</div>
  }
  
  return (

    <div className="timeline-list">
    {timelines.map(({message, createdAt, user: {name, profileImg}}) => {
      return <TodoTimeline message={message} createdAt={createdAt} name={name} profileImg={profileImg} />
    })}  
    </div>
  )
}
