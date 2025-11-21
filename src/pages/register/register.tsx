import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch, RootState, useSelector } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../services/slices/userSlice/userSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUserThunk({ name: userName, email, password }));
      navigate('/profile', { replace: true });
    } catch (_) {}
  };

  const { error } = useSelector((state: RootState) => state.user);

  return (
    <RegisterUI
      errorText={error?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
