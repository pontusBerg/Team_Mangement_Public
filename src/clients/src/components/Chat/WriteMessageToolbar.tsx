import React, { ReactElement } from 'react';
import Textarea from '../Shared/Textarea/Textarea';
import Button from '../Shared/Button/Button';
import IconHover from '../Shared/IconHover/IconHover';
import { AiOutlineSend } from 'react-icons/ai';
import { Event } from '../../types/event';
import './write-message-toolbar.styles.scss'
import IconColor from '../Shared/IconColor/IconColor';
interface Props {
  messageValue: string;
  onSendClick: () => void;
  onChange: (event: Event) => void;
}

export default function WriteMessageToolbar({
  messageValue,
  onChange,
  onSendClick,
}: Props): ReactElement {
  return (
    <div className="write-message-toolbar">
      <Textarea placeholder={"Write a message here..."} value={messageValue} onChange={(event) => onChange(event)} />
      <IconColor onClick={onSendClick} icon={<AiOutlineSend />} />
    </div>
  );
}
