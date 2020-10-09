import { User } from './user.types';
import { Action } from 'redux';

const DEFAULT_STATE: User = {
  user: {
    name: null,
    profileImg: null,
    id: null,
    team: null,
  },
  loading: true,
  error: false,
  authenticated: false,
};

interface ActionInterface {
  type: string;
  user: {
    _id: number;
    name: string;
    profileImg: string;
    team: string,
  };
}

export default (state = DEFAULT_STATE, action: ActionInterface) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state};

    case 'LOGOUT_USER':
      return {
        ...state,
        authenticated: false,
        user: { id: null, profileImg: null, name: null, team: null },
      };

    case 'LOGIN_REQUEST_LOADING':
      return { ...state, loading: true, error: false };

    case 'LOGIN_REQUEST_FAILED':
      return { ...state, loading: false, error: true };

    case 'LOGIN_REQUEST_SUCCESS':
      return {
        ...state,
        user: {
          name: action.user.name,
          id: action.user._id,
          profileImg: action.user.profileImg,
          team: action.user.team
        },
        loading: false,
        error: false,
        authenticated: true,
      };

    case 'AUTH_REQUEST_FAILED':
      return { ...state, authenticated: false, loading:false };

    case 'AUTH_REQUEST_SUCCESS':
      
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: {
          name: action.user.name,
          id: action.user._id,
          profileImg: action.user.profileImg,
          team: action.user.team
        },
      };

    default:
      return state;
  }
};
