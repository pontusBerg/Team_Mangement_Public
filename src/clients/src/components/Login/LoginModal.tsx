import React, { ReactElement } from 'react';
import InputIcon from '../Shared/InputIcon/InputIcon';
import Button from '../Shared/Button/Button'
import './login-modal.scss';

interface Props {
  onChangeEmail: (value: string) => void;
  emailIcon: React.ReactElement;
  onChangePassword: (value: string) => void;
  passwordIcon: React.ReactElement;
  emailValue: string;
  passwordValue: string;
  onClick: () => void;
  loading: boolean,
  error: boolean
}

export default function LoginModal({
  onChangeEmail,
  emailIcon,
  passwordIcon,
  onChangePassword,
  emailValue,
  passwordValue,
  onClick,
  loading,
  error
}: Props): ReactElement {
  return (
    <div className="login-modal">
      <InputIcon
        placeholder="Email"
        value={emailValue}
        icon={emailIcon}
        onChange={(value) => onChangeEmail(value)}
      />
      <InputIcon
        placeholder="Password"
        type="password"
        value={passwordValue}
        icon={passwordIcon}
        onChange={(value) => onChangePassword(value)}
      />
      <Button loading={loading} text="Log in" onClick={onClick} />
    </div>
  );
}
