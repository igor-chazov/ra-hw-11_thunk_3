import React from 'react';
import useAuthRoute from './hooks/useAuthRoute';
import Header from './components/Header';
import Content from './components/Content';
import './app.css';

function App() {
  useAuthRoute();

  return (
    <>
      <Header />
      <Content />
    </>
  );
}

export default App;
