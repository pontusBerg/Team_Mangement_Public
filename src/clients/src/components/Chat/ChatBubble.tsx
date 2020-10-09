import React, { ReactElement } from 'react'
import {Message} from '../../types/message'
import {format} from 'timeago.js'
interface Props {
  message: string,
  createdAt: Date,
  currentUserMessage: boolean,
}

export default function ChatBubble({message, currentUserMessage, createdAt}: Props): ReactElement {
  
  const chatBubbleStyle = () => {
    return currentUserMessage ? 
    {background: "#648CF6", color:"White"}
    :
    {background: "White", color: "#323232"}
  }

 
  return (
    <div style={chatBubbleStyle()} className="chat-bubble">
      <div className="chat-bubble-message">{message}</div>
      <div className="chat-bubble-createdAt">{format(createdAt)}</div>
    </div>
  )
}
