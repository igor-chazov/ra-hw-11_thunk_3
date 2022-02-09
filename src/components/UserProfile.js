import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../reducers/authSlice';

function UserProfile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logOut());
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="profile">
      <div>Добро пожаловать, {profile.name}</div>
      <div className="profile__avatar"><img src={profile.avatar} alt={profile.name} /></div>
      <button className="btn btn__outline-danger" type="button" onClick={handleLogOut}>Выйти</button>
    </div>
  )
}

export default UserProfile;
