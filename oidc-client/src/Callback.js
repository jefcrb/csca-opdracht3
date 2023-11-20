import React, { useEffect } from 'react';
import AuthService from './AuthService';

const Callback = () => {
  useEffect(() => {
    AuthService.signinRedirectCallback();
  }, []);

  return <div>Loading...</div>;
};

export default Callback;
