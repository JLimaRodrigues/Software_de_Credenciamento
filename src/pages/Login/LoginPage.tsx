import React from 'react';
import Login from '../../components/Login/Login';
import './styles.css';

function LoginPage() {
  return (
    <div className='container'>
      <div className='card'>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
