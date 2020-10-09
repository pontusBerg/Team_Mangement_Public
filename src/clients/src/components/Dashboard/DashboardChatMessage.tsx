import React, { ReactElement } from 'react'

interface Props {
message: string, 
user: string  
}

export default function DashboardChatMessage({message, user}: Props): ReactElement {
  return (
    <div className="dashboard-chat-message">
      <div className="">{message}</div>
    </div>
  )
}
