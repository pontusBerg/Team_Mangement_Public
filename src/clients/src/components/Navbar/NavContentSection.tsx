import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useReactPath } from '../../hooks/useReactPath';
interface Props {
  url: string;
  title?: string;
  icon: ReactElement;
  onClick: () => void;
  currentRoute: boolean,
}

export default function NavContentSection({
  url,
  title,
  icon,
  onClick,
  currentRoute
}: Props): ReactElement {


  
  return (
    <div
      onClick={onClick}
      style={
          currentRoute
          ? { background: '#363B59' }
          : { background: 'None' }
      }
      className="nav-content-section"
    >
      <Link className="nav-content-section-link" to={url}>
        {icon}
        <div className="nav-content-section-title">{title}</div>
      </Link>
    </div>
  );
}
