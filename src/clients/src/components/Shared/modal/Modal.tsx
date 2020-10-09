import React, { ReactElement } from 'react';
import { Portal } from '../../../Portals/Portal';
import './modal.style.css';
import { IconBaseProps } from 'react-icons/lib';
interface Props {
  title: string;
  icon: IconBaseProps;
  text: string;
  iconBackground?: string,
}

export default function Modal({ title, text, icon, iconBackground = "#648CF6" }: Props): ReactElement {
  return (
    <Portal>
      <div className="bottom-modal">
        <div style={{background: iconBackground}} className="bottom-modal-icon">
        {icon}
        </div>
        <div className="bottom-modal-text-content">
          <div className="bottom-modal-title">{title}</div>
          <div className="bottom-modal-text">{text}</div>
        </div>
      </div>
    </Portal>
  );
}
