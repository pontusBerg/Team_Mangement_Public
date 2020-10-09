import React, { ReactElement, ReactChild } from 'react';
import { Portal } from '../../../Portals/Portal';
import './fullscreen-modal.style.scss';
import {AiOutlineClose} from 'react-icons/ai'
import IconHover from '../IconHover/IconHover';
interface Props {
  children: any;
  onOutsideClick: () => void;
  onCloseModalClick: () => void;
}

export default function FullscreenModal({ children, onOutsideClick, onCloseModalClick }: Props): ReactElement {



  return (
    <Portal>
      <div onClick={event =>  {event.stopPropagation(); onOutsideClick()}} className="fullscreen-modal">
        <div onClick={e => e.stopPropagation()} className="fullscreen-modal-content">
          <IconHover onClick={onCloseModalClick} icon={<AiOutlineClose />} />
          {children}
        
        </div>
      </div>
    </Portal>
  );
}
