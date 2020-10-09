import React, { ReactElement } from 'react'
import './modal-confirm.scss'
import Button from '../Button/Button'
interface Props {
  text: string,
  onNoClick: () => void; 
  onYesClick: () => void;
}

export default function ModalConfirm({text, onYesClick, onNoClick}: Props): ReactElement {
  return (
    <div className="modal-confirm">
      <div className="modal-confirm-title">Hold up!</div>
      <div className="modal-confirm-text">{text}</div>
      <div className="modal-confirm-button-wrap">
      <Button text="Yes" onClick={onYesClick} />
      <Button className="btn-decline" text="No" onClick={onNoClick} />
      </div>
    </div>
  )
}
