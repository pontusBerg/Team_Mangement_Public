import React, { ReactElement, ReactNode, useEffect } from 'react';
import { connect } from 'react-redux';
import NavbarContainer from '../../Navbar/Navbar.container';
import UserProfile from '../UserProfile/UserProfile';
import UserProfileContainer from '../../Dashboard/UserProfile.container';
import PublicChatContainer from '../../Dashboard/PublicChat.container';
import { useWindowWidth } from '@react-hook/window-size';
import './layout.styles.scss';
import Container from '../Container/Container';
import { useHistory, useLocation } from 'react-router-dom';
interface Props {
  children: ReactNode;
  profileImg: string;
  name: string;
  socket: any, 
}




function Layout({ children, name, profileImg, socket}: Props): ReactElement {
  const width = useWindowWidth();
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="page-container">
      <div className="page-container-left">
        <NavbarContainer />
      <Container className={location.pathname === "/dashboard/user" ||location.pathname === "/dashboard/team" ? "container-overflow" : "container"}>
        <div className="layout-content">{children}</div>
      </Container>
      </div>
      {width > 1024 && (
        <div className="page-container-right">
          <UserProfileContainer socket={socket}  />
          <PublicChatContainer />
        </div>
      )}
    </div>

  );
}

const mapStateToProps = (state: any) => ({
  profileImg: state.userInfo.user.profileImg,
  name: state.userInfo.user.name,
});

export default connect(mapStateToProps)(Layout);
