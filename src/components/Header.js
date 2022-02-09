import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">Neto Social</div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/news" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default Header;
