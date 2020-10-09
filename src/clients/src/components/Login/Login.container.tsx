import React, { ReactElement, useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { connect, MapStateToProps } from 'react-redux';
import { LoginInfo } from '../../redux/user/user.types';
import {startLoginUser} from '../../redux/user/user.actions'
import { useHistory } from 'react-router-dom';
import hero from '../../media/hero.jpg'
import { useWindowWidth } from '@react-hook/window-size';
import './login-page.scss'
interface Props {
  startLoginUser: any,
  loading: boolean,
  error: boolean, 
  authenticated: boolean
}

interface Users {
  user?: {
    email?: string,
    password?: string
  }
}

function LoginContainer({startLoginUser, loading, authenticated, error}: Props): ReactElement {
  const width = useWindowWidth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const login = () => {
    const user = {
      email,
      password
    }
    startLoginUser(user)
  };



  useEffect(() => {
    if(authenticated) {
    handleLoginSuccess()
    }
  }, [authenticated])


  const handleLoginSuccess = () => {
    history.push('/dashboard/user')
  }

  const handleLoginError = () => {
  }

  return (
    <div className="login-page">
      {width > 1024 && 
      <img className="login-hero" src={hero} alt=""/>
      }
      <div className="login-page-right">
        {width > 1024 && 
        <div className="login-page-title">
          The easy way to collaborate
        </div>
        }
      <div>
      <LoginModal
        onChangeEmail={(value) => handleEmailChange(value)}
        emailIcon={<AiOutlineUser />}
        onChangePassword={(value) => handlePasswordChange(value)}
        passwordIcon={<AiOutlineLock />}
        emailValue={email}
        passwordValue={password}
        onClick={login}
        loading={loading}
        error={error}
      />
      </div>
            {error && 
      <div className="login-modal-error">Could not sign in</div>
      }
      
      <div className="login-email" id="login-first-user">
      kathieandrewson@team.com

      </div>
      <div className="login-email">stephaniestacy@team.com</div>
      <div className="login-email">
      johnkendal@team.com
      </div>
      <div className="login-email">devindustin@team.com</div>
      <div className="login-email">kodynicholson@team.com</div>
      <div className="login-password">password: test123</div>
      </div>
      </div>
  );
}


const mapDispatchToProps = (dispatch: any) => ({
 startLoginUser: (user: LoginInfo) => dispatch(startLoginUser(user))
})

const mapStateToProps = (state: any) => ({
  loading: state.userInfo.loading,
  error: state.userInfo.error,
  authenticated: state.userInfo.authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)