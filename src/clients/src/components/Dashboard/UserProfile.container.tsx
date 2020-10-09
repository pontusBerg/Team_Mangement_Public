import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import UserProfile from '../Shared/UserProfile/UserProfile';
import NotificationDropdownList from '../Shared/NotificationsDropdown/NotificationDropdownList';
import { Notification } from '../../types/notification';
import { startFetchNotifications } from '../../redux/notifications/notifications.actions';
import IconHover from '../Shared/IconHover/IconHover';
import { MdNotificationsNone } from 'react-icons/md';
import { updateOneNotification } from '../../utils/api/notifications';

interface Props {
  profileImg: string;
  name: string;
  notifications: Notification[];
  startFetchNotifications: () => void;
  socket: any;
}

function UserProfileContainer({
  profileImg,
  name,
  notifications,
  socket,
  startFetchNotifications,
}: Props): ReactElement {
  const [togglePopup, setTogglePopup] = useState(false);
  const [unseenNotifications, setUnseenNotifications] = useState(0);
  const wrapperRef = useRef(null);
  const firstRender = useRef(false);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    startFetchNotifications();
  }, []);

  useEffect(() => {
    countUnseenNotifications();
  }, [notifications]);

  useEffect(() => {
    socket.on('newNotification', () => {
      startFetchNotifications()
    })
  }, [])

  useEffect(() => {
    firstRender.current = false;
  }, []);


  const handleToggleNotificationsClick = () => {
    setUnseenNotifications(0);
    setTogglePopup(!togglePopup);
    markAllNotificationsAsSeen();
  };

  const markAllNotificationsAsSeen = async () => {
    notifications.forEach(({ _id, seen }) => {
      if (!seen) {
        updateOneNotification(_id, { seen: true });
      }
    });
  };

  const countUnseenNotifications = () => {
    const unseenNotifications = notifications.filter(
      ({ seen }) => seen !== true
    );
    setUnseenNotifications(unseenNotifications.length);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTogglePopup(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const handleOnToggleDropdownClick = () => {
    setUnseenNotifications(0);
  };

  return (
    <div style={{ position: 'relative' }} className="user-profile-container">
      <div ref={wrapperRef} className="user-profile-notification-wrap">
        <IconHover
          icon={<MdNotificationsNone />}
          onClick={handleToggleNotificationsClick}
        />
        {togglePopup && (
          <NotificationDropdownList
            onClick={handleOnToggleDropdownClick}
            notifications={notifications}
          />
        )}
        {unseenNotifications > 0 && <div className="user-profile-notification-number">{unseenNotifications}</div>}
      </div>
      <UserProfile name={name} img={profileImg} />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  profileImg: state.userInfo.user.profileImg,
  name: state.userInfo.user.name,
  notifications: state.notificationsInfo.notifications,
});

const mapDispatchToProps = (dispatch: any) => ({
  startFetchNotifications: () => dispatch(startFetchNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
