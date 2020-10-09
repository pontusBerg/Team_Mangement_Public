import React, { ReactElement } from 'react'

interface Props {
  sizeInPixels: string,
  img: string,
}

export default function ChatProfileImg({sizeInPixels, img}: Props): ReactElement {
  
  const imageSize = {
    height: sizeInPixels,
    width: sizeInPixels 
  }
  
  return (
    <div className="chat-profile-img">
      <img style={imageSize} src={img} alt=""/>
    </div>
  )
}
