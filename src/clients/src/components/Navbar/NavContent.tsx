import React, { ReactElement, useEffect, useState } from 'react';
import {
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlinePlusSquare,
  AiOutlineComment,
} from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory, Link, withRouter, useLocation } from 'react-router-dom';
import NavContentSection from './NavContentSection';
import { connect } from 'react-redux';
import {
  startLogoutUser,
  authByToken,
  startAuthUser,
} from '../../redux/user/user.actions';
interface Props {
  onNavSectionClick: () => void;
  startLogoutUser: () => void;

}

function NavContent({
  onNavSectionClick,
  startLogoutUser,

}: Props): ReactElement {
  const location = useLocation()


  const handleLogoutClick = () => {
    startLogoutUser();
  };


  return (
    <div className="nav-content">
      <div className="nav-content-upper">
        <NavContentSection
          onClick={onNavSectionClick}
          url="/dashboard/user"
          title="Your Todos"
          icon={<AiOutlineUser className="nav-content-section-icon" />}
          currentRoute={location.pathname === '/dashboard/user'}
        />
        <NavContentSection
          onClick={onNavSectionClick}
          url="/dashboard/team"
          title="Team Todos"
          icon={<AiOutlineTeam className="nav-content-section-icon" />}
          currentRoute={location.pathname === '/dashboard/team'}
        />
        <NavContentSection
          onClick={onNavSectionClick}
          url="/todo/create"
          title="Create Todo"
          icon={<AiOutlinePlusSquare className="nav-content-section-icon" />}
          currentRoute={location.pathname === '/todo/create'}
        />
        <NavContentSection
          onClick={onNavSectionClick}
          url="/messages/team"
          title="Team Chat"
          icon={<AiOutlineComment className="nav-content-section-icon" />}
          currentRoute={location.pathname === '/messages/team'}
        />
      </div>
      <div className="nav-content-lower">
        <NavContentSection
          url="/login"
          icon={<FaSignOutAlt className="nav-content-section-icon" />}
          title="Log out"
          onClick={handleLogoutClick}
          currentRoute={location.pathname === '/login'}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  startLogoutUser: () => dispatch(startLogoutUser()),
});

export default connect(null, mapDispatchToProps)(NavContent);
