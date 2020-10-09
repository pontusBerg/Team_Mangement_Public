import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import NavbarContainer from './components/Navbar/Navbar.container';
import UserDashboardContainer from './components/Dashboard/UserDashboard.container';
import { connect } from 'react-redux';
import { startAuthUser } from './redux/user/user.actions';
import UserProfile from './components/Shared/UserProfile/UserProfile';
import Layout from './components/Shared/Layout/Layout';
import CreateTodoContainer from './components/CreateTodo/CreateTodo.container';
import TeamChatContainer from './components/Chat/TeamChat.container';
import TeamDashboardContainer from './components/Dashboard/TeamDashboard.container';
import TodoInfoContainer from './components/TodoInfo/TodoInfo.container';
import { filterTodos } from './redux/user-todos/user-todo.actions';
import LoadingSpinner from './components/Shared/LoadingSpinner/LoadingSpinner';
import FailedFetch from './components/Shared/FailedFetch/FailedFetch';
import io from 'socket.io-client';
import { AxiosPromise } from 'axios';
interface Props {
  startAuthUser: () => AxiosPromise;
  authenticated: boolean;
  loading: boolean;
  id: string;
}

let socket: any;

function PrivateRoutes({
  authenticated,
  startAuthUser,
  loading,
  id,
}: Props): ReactElement {
  
  const [socketz, setSocketz] = useState(false)
  
  useEffect(() => {
   startAuthUser()
  }, [])

  useEffect(() => {
    const URL = process.env.PORT || `http://localhost:4000/`
    socket = io(URL)


    return () => socket.emit("disconnect")
  }, [])


  if (loading) {
    return <div></div>;
  }


  return (
    <>
      {authenticated ? (
        <>
          <Layout socket={socket}>
            <Switch>
              <Route
                path="/todo/create"
                exact
                render={(props) => (
                  <CreateTodoContainer socket={socket} match={props.match} />
                )}
              />
              <Route
                exact
                path="/dashboard/user"
                component={UserDashboardContainer}
              />
              <Route path="/todo/:id" exact component={TodoInfoContainer} />
              <Route
                exact
                path="/messages/team"
                render={(props) => <TeamChatContainer socket={socket} />}
              />
              <Route
                exact
                path="/dashboard/team"
                component={TeamDashboardContainer}
              />
            </Switch>
          </Layout>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  authenticated: state.userInfo.authenticated,
  loading: state.userInfo.loading,
  id: state.userInfo.user.id,
});

const mapDispatchToProps = (dispatch: any) => ({
  startAuthUser: () => dispatch(startAuthUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
